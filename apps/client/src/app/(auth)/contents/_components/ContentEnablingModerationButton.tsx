import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/lib/instances/api";
import { useContentsStore } from "@/stores/contents";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function ContentEnablingModerationButton() {
  const isSelectionMode = useContentsStore((state) => state.isSelectionMode);
  const setSelectionMode = useContentsStore((state) => state.setSelectionMode);
  const selectedIds = useContentsStore((state) => state.selectedIds);

  const [isLoading, startTransition] = useTransition()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClick = () => {
    if (!isSelectionMode) {
      setSelectionMode(true)
      return
    }

    // End selection mode if no items are selected
    if (!selectedIds.length) {
      setSelectionMode(false);
      return
    }

    // If in selection mode and items are selected, confirm the selection
    setModalIsOpen(true);
  }

  const handleConfirm = () => {
    startTransition(async () => {
      const { error } = await api.moderation.enable.post({
        ids: selectedIds
      })

      if (error) {
        toast.error("Une erreur est survenue lors de l'activation de la modération intelligente.", {
          position: "top-right",
          richColors: true,
        });
        return
      }

      toast.success("La modération intelligente a été activée avec succès pour les contenus sélectionnés.", {
        position: "top-right",
        richColors: true,
      });

      setSelectionMode(false);
      setModalIsOpen(false);
    })
  }

  return <>
    <Button
      size="sm"
      className="cursor-pointer"
      variant={isSelectionMode ? "default" : "outline"}
      onClick={handleClick}
    >
      {!isSelectionMode
        ? "Activer la modération intelligente"
        : "Confirmer la sélection" + ` (${selectedIds.length})`
      }
    </Button>

    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voulez-vous activer la modération intelligente ?</DialogTitle>
          <DialogDescription>
            Vous avez sélectionné {selectedIds.length} {selectedIds.length > 1 ? "éléments" : "élément"} pour la modération intelligente. Cette action va activer la modération pour ces contenus et les traiter en conséquence.
            Votre quota de modération sera utilisée pour ces contenus.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? <>
              <Spinner />
              <span>Activation en cours...</span>
            </> : "Activer la modération"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </>
}
