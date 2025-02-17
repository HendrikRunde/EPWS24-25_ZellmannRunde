**1. Prüfen, ob das Framework "fluent-ffmpeg" die Option einer Qualitätsanpassung bei der Verkleinerung anbietet**

**Exit-Kriterien:**

- Die Frameworks bieten eine leicht konfigurierbare und effektive Option zur Qualitätsanpassung.
- Qualitätsanpassung führt zu einer signifikanten Reduktion der Dateigröße bei minimalen Qualitätseinbußen.
- Benutzer sind in der Lage, die Qualitätsanpassung nach ihren Anforderungen anzupassen.

**Fail-Kriterien:**

- Die Frameworks bieten keine Option zur Qualitätsanpassung.
- Die Qualitätsanpassung führt zu erheblichen Qualitätseinbußen oder sogar zu Datenverlust.
- Die Option zur Qualitätsanpassung ist schwer zu konfigurieren.
- Qualitätsanpassungen haben keine spürbare Auswirkung auf die Dateigröße.

**Fallback-Kriterien:**

- Zusätzliche Bibliotheken/Frameworks integrieren, die diese Funktionalität bieten.

**2. Prüfen, ob das System mehrere gleichzeitige Datei-Uploads stabil und performant verarbeitet**

**Exit-Kriterien:**

- Das System kann mehrere gleichzeitige Datei-Uploads ohne merkliche Performanceeinbußen oder Stabilitätsprobleme verarbeiten.
- Alle Dateien werden korrekt und vollständig hochgeladen.
- Die Upload-Dauer ist akzeptabel und wird durch die gleichzeitigen Uploads nicht übermäßig verlängert.

**Fail-Kriterien:**

- Das System stürzt ab oder wird extrem langsam bei mehreren gleichzeitigen Datei-Uploads.
- Dateien werden fehlerhaft oder unvollständig hochgeladen.
- Upload-Prozesse blockieren sich gegenseitig, wodurch die Gesamtperformance leidet.
  
**Fallback-Kriterien:**

- Implementierung von Warteschlangen, um die Anzahl der gleichzeitigen Uploads zu begrenzen.
- Optimierung des Systems durch Skalierung oder Verbesserung der Infrastruktur.

**3. Prüfen, ob Komprimierungsalgorithmus "fluent-ffmpeg" eine akzeptable Qualitätsstufe bei unterschiedlichen Dateiformaten (z. B. JPEG, PNG, MP4) gewährleistet**

**Exit-Kriterien:**

- Die Komprimierungsalgorithmen liefern eine hohe Qualität bei allen unterstützten Dateiformaten.
- Die Komprimierungszeit ist akzeptabel und beeinträchtigt nicht die Benutzererfahrung (UX).
- Benutzer sind mit der Qualität der komprimierten Dateien zufrieden.

**Fail-Kriterien:**

- Komprimierungsalgorithmen führen zu inakzeptablen Qualitätsverlusten bei bestimmten Dateiformaten.
- Bestimmte Dateiformate werden nicht unterstützt oder führen zu Fehlern während der Komprimierung.
- Die Komprimierungsdauer ist zu lang und beeinträchtigt die Benutzererfahrung.
  
**Fallback-Kriterien:**

- Alternative Komprimierungsalgorithmen oder -tools evaluieren und integrieren.
- Benutzeroptionen anbieten, um zwischen verschiedenen Komprimierungsalgorithmen zu wählen.

**4. Prüfen, ob Nutzer während des Upload- und Verarbeitungsprozesses durch Fortschrittsanzeigen und Rückmeldungen ausreichend informiert werden**

**Exit-Kriterien:**

- Nutzer erhalten präzise und verständliche Rückmeldungen während des gesamten Upload- und Verarbeitungsprozesses.
- Fortschrittsanzeigen sind genau und reflektieren den aktuellen Status des Prozesses.
- Benutzer sind mit den bereitgestellten Informationen zufrieden und fühlen sich gut informiert.
  
**Fail-Kriterien:**

- Nutzer erhalten keine oder unzureichende Rückmeldungen während des Upload- und Verarbeitungsprozesses.
- Fortschrittsanzeigen sind ungenau oder bleiben hängen.
  
**Fallback-Kriterien:**

- Verbesserung der Benutzeroberfläche und der Rückmeldesysteme, um deutlichere und genauere Fortschrittsanzeigen zu bieten.
