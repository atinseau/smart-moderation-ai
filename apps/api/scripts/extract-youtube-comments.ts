interface YouTubeCommentData {
  comment: {
    content: string | null;
    published_time: string | null;
  };
  author: {
    username: string | null;
    display_name: string | null;
    profile_url: string | null;
    avatar_url: string | null;
  };
  engagement: {
    likes: number;
    has_replies: boolean;
    is_hearted_by_creator: boolean;
  };
  metadata: {
    is_paid_comment: boolean;
    language: string | null;
  };
}

// Use the Bun HTMLRewriter types if available, otherwise fallback to any
type HTMLRewriterElement = any;

class YouTubeCommentExtractor {
  private comments: YouTubeCommentData[] = [];
  private currentComment: YouTubeCommentData | null = null;

  private createEmptyCommentData(): YouTubeCommentData {
    return {
      comment: {
        content: null,
        published_time: null,
      },
      author: {
        username: null,
        display_name: null,
        profile_url: null,
        avatar_url: null,
      },
      engagement: {
        likes: 0,
        has_replies: false,
        is_hearted_by_creator: false,
      },
      metadata: {
        is_paid_comment: false,
        language: null,
      },
    };
  }

  public extractCommentsFromContainer(html: string): YouTubeCommentData[] {
    this.comments = [];

    const rewriter = new HTMLRewriter()
      // Détecter chaque nouveau commentaire
      .on('ytd-comment-thread-renderer', {
        element: (element: HTMLRewriterElement) => {
          // Finaliser le commentaire précédent s'il existe
          if (this.currentComment) {
            this.finalizeComment(this.currentComment);
            this.comments.push(this.currentComment);
          }

          // Créer un nouveau commentaire
          this.currentComment = this.createEmptyCommentData();

          // SUPPRIMÉ: Vérifier si c'est un commentaire épinglé
          // if (element.hasAttribute('pinned')) {
          //   this.currentComment.engagement.is_pinned = true;
          // }
        },
      })

      // Extraire le contenu du commentaire
      .on('ytd-comment-thread-renderer #content-text span[role="text"]', {
        text: (text: { text: string }) => {
          if (!this.currentComment) return;

          if (!this.currentComment.comment.content) {
            this.currentComment.comment.content = text.text;
          } else {
            this.currentComment.comment.content += text.text;
          }
        },
      })

      // Extraire la date de publication
      .on('ytd-comment-thread-renderer #published-time-text a', {
        text: (text: { text: string }) => {
          if (!this.currentComment) return;

          if (!this.currentComment.comment.published_time) {
            this.currentComment.comment.published_time = text.text.trim();
          }
        },
      })

      // Extraire les informations de l'auteur
      .on('ytd-comment-thread-renderer #author-text', {
        element: (element: HTMLRewriterElement) => {
          if (!this.currentComment) return;
          this.currentComment.author.profile_url = element.getAttribute('href');
        },
        text: (text: { text: string }) => {
          if (!this.currentComment) return;

          const username = text.text.trim();
          if (username && !this.currentComment.author.username) {
            this.currentComment.author.username = username;
            this.currentComment.author.display_name = username.replace('@', '');
          }
        },
      })

      // Extraire l'avatar de l'auteur
      .on('ytd-comment-thread-renderer #author-thumbnail img', {
        element: (element: HTMLRewriterElement) => {
          if (!this.currentComment) return;
          this.currentComment.author.avatar_url = element.getAttribute('src');
        },
      })

      // Extraire le nombre de likes
      .on('ytd-comment-thread-renderer #vote-count-middle', {
        text: (text: { text: string }) => {
          if (!this.currentComment) return;

          const likes = parseInt(text.text.trim());
          if (!isNaN(likes)) {
            this.currentComment.engagement.likes = likes;
          }
        },
      })

      // Vérifier si le commentaire est payant
      .on('ytd-comment-thread-renderer #paid-comment-chip', {
        element: (element: HTMLRewriterElement) => {
          if (!this.currentComment) return;
          this.currentComment.metadata.is_paid_comment = !element.hasAttribute('hidden');
        },
      })

      // SUPPRIMÉ: Vérifier si le commentaire est épinglé (badge)
      // .on('ytd-comment-thread-renderer #pinned-comment-badge', {
      //   element: (element: HTMLRewriterElement) => {
      //     if (!this.currentComment) return;
      //     // @ts-ignore: innerHTML may exist in some DOM implementations
      //     this.currentComment.engagement.is_pinned = (element as any).innerHTML?.trim() !== '';
      //   },
      // })

      // Vérifier si le commentaire a un cœur du créateur
      .on('ytd-comment-thread-renderer #creator-heart', {
        element: (element: HTMLRewriterElement) => {
          if (!this.currentComment) return;
          // @ts-ignore: innerHTML may exist in some DOM implementations
          this.currentComment.engagement.is_hearted_by_creator = (element as any).innerHTML?.trim() !== '';
        },
      })

      // SUPPRIMÉ: Extraire les métadonnées de l'expandeur (is_expanded, max_lines)
      // .on('ytd-comment-thread-renderer #expander', {
      //   element: (element: HTMLRewriterElement) => {
      //     if (!this.currentComment) return;
      //
      //     const maxLines = element.getAttribute('max-number-of-lines');
      //     if (maxLines) {
      //       this.currentComment.metadata.max_lines = parseInt(maxLines);
      //     }
      //
      //     this.currentComment.metadata.is_expanded = !element.hasAttribute('collapsed');
      //   },
      // })

      // Vérifier s'il y a des réponses
      .on('ytd-comment-thread-renderer #replies', {
        element: (element: HTMLRewriterElement) => {
          if (!this.currentComment) return;
          this.currentComment.engagement.has_replies = !element.hasAttribute('hidden');
        },
      });

    // Transformer le HTML
    rewriter.transform(html);

    // Finaliser le dernier commentaire s'il existe
    if (this.currentComment) {
      this.finalizeComment(this.currentComment);
      this.comments.push(this.currentComment);
    }

    // Filtrer les commentaires vides ou incomplets
    return this.comments.filter(comment =>
      comment.comment.content &&
      comment.author.username
    );
  }

  private finalizeComment(comment: YouTubeCommentData): void {
    // Détecter la langue basée sur le texte de publication
    if (comment.comment.published_time && comment.comment.published_time.includes('il y a')) {
      comment.metadata.language = 'fr';
    } else if (comment.comment.published_time && comment.comment.published_time.includes('ago')) {
      comment.metadata.language = 'en';
    }
  }

  // Méthode pour un seul commentaire (rétrocompatibilité)
  public extractCommentData(html: string): YouTubeCommentData {
    const comments = this.extractCommentsFromContainer(html);
    return comments.length > 0 ? comments[0] : this.createEmptyCommentData();
  }
}

// Fonction pour extraire tous les commentaires d'un container YouTube
function extractYouTubeComments(html: string): YouTubeCommentData[] {
  const extractor = new YouTubeCommentExtractor();
  return extractor.extractCommentsFromContainer(html);
}

// Fonction utilitaire pour extraire les données d'un commentaire YouTube (rétrocompatibilité)
function extractYouTubeCommentData(html: string): YouTubeCommentData {
  const extractor = new YouTubeCommentExtractor();
  return extractor.extractCommentData(html);
}

async function main(): Promise<void> {
  const file = await Bun.file('./scripts/youtube.html').text();

  // Extraire tous les commentaires
  const allComments = extractYouTubeComments(file);
  console.log(`Nombre de commentaires trouvés: ${allComments.length}`);

  Bun.write(
    './scripts/youtube-comments.json',
    JSON.stringify(allComments, null, 2)
  );

  // Ou extraire un seul commentaire (ancienne méthode)
  // const commentData = extractYouTubeCommentData(file);
  // console.log(commentData);
}

main();
