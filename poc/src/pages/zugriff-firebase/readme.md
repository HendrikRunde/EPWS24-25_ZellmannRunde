5. Prüfen, ob lesender und schreibender Zugriff auf Datenbank (Google Firebase) funktioniert

Exit-Kriterien:

- Erfolgreiche Datenübertragung: Der Zugriff auf die Datenbank wird beendet, wenn alle erforderlichen Daten korrekt übertragen wurden und keine weiteren Daten benötigt werden.
- Datenkonsistenz: Der Zugriff wird beendet, wenn die Integrität und Konsistenz der Daten überprüft und bestätigt wurden.

Fail-Kriterien:

- Authentifizierungsfehler: Wenn der Benutzer nicht erfolgreich authentifiziert werden kann, wird der Zugriff als fehlgeschlagen betrachtet.
- Netzwerkfehler: Wenn eine Netzwerkverbindung nicht hergestellt oder aufrechterhalten werden kann, gilt der Zugriff als fehlgeschlagen.
- Datenbankfehler: Wenn die Datenbank aufgrund von Serverproblemen oder anderen technischen Schwierigkeiten nicht erreichbar ist, wird der Zugriff als fehlgeschlagen betrachtet.
- Ungültige Daten: Wenn die übermittelten Daten ungültig oder unvollständig sind und nicht verarbeitet werden können, wird der Zugriff als fehlgeschlagen betrachtet.

Fallback-Kriterien:

- Alternative Datenquelle: Wenn die primäre Datenbank nicht erreichbar ist, kann auf eine alternative Datenquelle zugegriffen werden.
- Wiederholungsversuch: Wenn der Zugriff fehlschlägt, können eine festgelegte Anzahl von Wiederholungsversuchen unternommen werden, bevor endgültig aufgegeben wird.
- Benachrichtigung an den Benutzer: Falls der Zugriff fehlschlägt, wird der Benutzer informiert und es werden Anweisungen zur weiteren Vorgehensweise gegeben.
