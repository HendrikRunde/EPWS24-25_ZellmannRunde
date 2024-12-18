**POC:** Erstellung eines personalisierten Links

**Ziel:** Sicherstellen, dass der Content Manager einen eindeutigen Link mit den eingegebenen Parametern erstellen kann.

**Exit-Kriterien:**
1. Ein Link wird erfolgreich generiert.
2. Der Link enthält eine eindeutige ID und die eingegebenen Parameter:
- Maximale Uploads.
- Gültigkeitszeitraum.
- Optimierungsparameter.
3. Der generierte Link wird korrekt gespeichert.
  
**Fail-Kriterien:**
1. Der Link wird nicht erstellt oder ist nicht eindeutig.
2. Die eingegebenen Parameter werden nicht übernommen.
3. Der Link wird nicht in der Datenbank gespeichert.

**Fallback-Kriterien:**
1. Es wird ein Standardlink mit vordefinierten Parametern erstellt.
