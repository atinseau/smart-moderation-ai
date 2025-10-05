from lingua import Language, LanguageDetectorBuilder

def detect_language(text: str):
    languages = [Language.ENGLISH, Language.FRENCH]
    detector = LanguageDetectorBuilder.from_languages(*languages).build()
    return detector.detect_language_of(text)
