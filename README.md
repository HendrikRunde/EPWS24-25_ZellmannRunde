# EPWS24-25_ZellmannRunde ShrinkIT
Entwicklungprojekt mit Schwerpunkt Web Development

# Projektkontext
Im Rahmen des Entwicklungsprojekts mit dem Schwerpunkt Web Development entwickeln wir eine Webapplikation, die es ermöglicht zu große Mediendateien zu verkleinern bzw. zu komprimieren bevor diese in einem CMS hochgeladen werden.

# Hintergrund
Content-Management-Systeme (CMS) sind wichtige Werkzeuge zur Verwaltung und Veröffentlichung digitaler Inhalte wie Bilder, Videos und Audio. Sie ermöglichen es Benutzern, Inhalte ohne technische Vorkenntnisse zu erstellen und zu pflegen. Bekannte Beispiele für CMS sind WordPress, Joomla! und Drupal. Obwohl CMS-Lösungen die Inhaltsverwaltung vereinfachen, führen große, unoptimierte Dateien häufig zu Performance-Problemen und belasten die Systemkapazität. Dies gilt insbesondere für Medieninhalte wie hochauflösende Bilder oder große Videodateien, die auf Websites und Plattformen veröffentlicht werden.

# Problemstellung
Durch die Verwendung von mobilen, hochauflösenden Endgeräten bzw. Kameras kommt es oftmals dazu, dass Kunden mit übergroßen Mediendateien arbeiten und diese dann in ein CMS hochladen. Dies führt jedoch zu Speicher- und Performance-Problemen oder aber dieser Vorgang wird sogar direkt vom CMS blockiert. Daher bedarf es einer Anwendung, welche dem Kunden eine unkomplizierte und benutzerfreundliche Optimierung ermöglicht.

# Lösungsansatz
Es bedarf zunächst einer vielseitigen Formatunterstützung jeglicher Bild-, Video- und Audioformate. Darüber hinaus wird eine benutzerfreundliche Oberfläche erwartet, die einen einfachen Upload-Prozess für Kunden ohne zusätzliche Konfiguration möglich macht. Die Implementierung eines Administrationsbereichs bietet die Möglichkeit flexible Konfigurationsmöglichkeiten und die Verwaltung von Kundenkonten. Zudem ist es von Vorteil mehrere Kunden gleichzeitig bedienen und somit größere Datenmengen zur selben Zeit verarbeiten zu können (Skalierbarkeit). Zuletzt ist auch die Sicherheit von großer Bedeutung. Die Speicherung bzw. Übertragung von Daten verlangt eine gewisse Sicherheit, genauso wie der Schutz vor unbefugtem Zugriff essentiell ist.

# Zielsetzung
Ziel des Projekts ist es, eine leistungsfähige Webanwendung zu entwickeln, die Nutzer ohne technische Vorkenntnisse dabei unterstützt, Mediendateien in geeigneter Größe und Qualität für den Einsatz in Content-Management-Systemen (CMS) bereitzustellen. Die Anwendung soll sicherstellen, dass Medieninhalte schnell und einfach optimiert werden können, um so die Performance und Effizienz der verwendeten CMS-Plattformen zu steigern. Das Projekt legt besonderen Wert auf Benutzerfreundlichkeit, Anpassungsfähigkeit und Datensicherheit und richtet sich an eine Zielgruppe, die im Arbeitsalltag regelmäßig Medieninhalte verwaltet und hochlädt.
# Zielgruppe
Admin/ Account-Manager

Admin/ Account-Manager sind Personen oder Unternehmen, die für die Verwaltung eines CMS und die Inhalte auf einer Website verantwortlich sind. Sie legen die Optimierungsvorgaben für die Dateiarten und -größen fest und verwalten den Kunden-Upload über personalisierte Links. Ihre Hauptanforderung ist es, sicherzustellen, dass große Dateien optimiert werden, bevor sie auf die Website geladen werden, um die Serverlast und die Ladezeiten der Website zu minimieren.

Kunden

Kunden sind die Benutzer, die regelmäßig Medieninhalte (Bilder, Videos, Audio) hochladen müssen. Sie haben oft wenig technisches Wissen und benötigen eine Lösung, die ihnen erlaubt, Dateien ohne manuelle Optimierungsschritte hochzuladen. Für sie ist es wichtig, dass der Prozess einfach, schnell und ohne zusätzliche Anpassungen funktioniert. Die Anwendung gibt ihnen die Möglichkeit, optimierte Dateien zu erhalten, die direkt ins CMS hochgeladen werden können.

# User Flow Admin/Account-Manager und Kunde

Admin/Account-Manager
1. Anmeldung im Adminbereich 
2. Definition der Vorgaben für Dateigröße/Auflösung
3. Auswahl des Kunden
4. Definition bzw. Prüfen des Guthabens für jeden einzelnen Kunden
5. Definition bzw. Prüfen des Gültigkeitszeitraumes personalisierter Links
6. Generierung des personalisierten Zugriffslinks
7. Änderungen speichern

Kunde
1. Anmeldung in der Anwendung
2. Dashboard-Übersicht

3a. erhält Information, ob noch genügend Guthaben vorhanden ist

3b. Exception: weitere Verkleinerung nicht möglich

4a. Hochladen der gewünschten Mediendatei

4b. Möglichkeit Vorgang abzubrechen

5. Visuelle Bestätigung und Erhalten des fertigen Ergebnisses als Download

# Tech Stack
- Frontend: Intuitive Benutzeroberfläche für den Upload und Download von Dateien. Realisierung mit Vue.js
- Backend: Verarbeitung der hochgeladenen Dateien, Durchführung der Optimierungsprozesse, Verwaltung von Kundenkonten und Speicherung der Ergebnisse. Verwendung von Nuxt.js für die Entwicklung des Backends.
-	Cloud-Infrastruktur: Skalierbare Cloud-Lösung für die Datenspeicherung mit Google Firebase (Realtime Database)
- Programmiersprachen: Verwendung von JavaScript bei der Implentierung der Anwendung mit Vue.js und Nuxt.js
- Frameworks: Nutzung von Web-Frameworks wie Bootstrap für die schnelle Entwicklung der Benutzeroberfläche.

# Erste POC´s

1. Prüfen, ob ausgewählte Frameworks Dateiverkleinerung korrekt ausführen
2. Prüfen, ob die Frameworks die Option einer Qualitätsanpassung bei der Verkleinerung anbieten
3. Prüfen, ob das System eine sichere Authentifizierung und Autorisierung für die verschiedenen Benutzerrollen bietet
4. Prüfen, ob das System mehrere gleichzeitige Datei-Uploads stabil und performant verarbeitet
5. Prüfen, ob verschiedene Komprimierungsalgorithmen eine akzeptable Qualitätsstufe bei unterschiedlichen Dateiformaten (z. B. JPEG, PNG, MP4) gewährleisten
6. Prüfen, ob Nutzer während des Upload- und Verarbeitungsprozesses durch Fortschrittsanzeigen und Rückmeldungen ausreichend informiert werden

Beide Prüfungen sollen für alle Medientypen durchgeführt werden (JPEG, PNG, MP3, MP4) 

# Mögliche Herausforderungen

-Handling großer Dateien:

	  • Speicherbedarf und Ladezeiten: Große Mediendateien beanspruchen erhebliche Bandbreite und verlängern Ladezeiten, besonders bei langsamen Internetverbindungen oder mobilen Geräten.
 
    • Speichereffizienz und Skalierbarkeit: Um das kontinuierlich wachsende Datenvolumen zu bewältigen, ist eine skalierbare Speicherlösung erforderlich, die auch mit steigender Dateigröße zurechtkommt.
 
-Sicherheit (Datenschutz):

    •	Datenintegrität und Datenschutz: Alle hochgeladenen Dateien und Benutzerdaten müssen sicher gespeichert und übertragen werden. Es ist wichtig, Datenschutzvorgaben zu erfüllen und entsprechende Sicherheitsprotokolle umzusetzen, um Compliance und Datensicherheit zu gewährleisten.
  
    •	Benutzerrollen und Berechtigungen
  
-Verfügbarkeit und Zuverlässigkeit der Anwendung:
  
    •	Systemverfügbarkeit bei hoher Benutzerlast: Hohe Benutzerzahlen oder plötzliche Traffic-Spitzen können das System überlasten.
  
    •	Datenverlust und Systemausfälle
  
    •	Einheitliche Links: Benutzer benötigen oft einen konsistenten Link für den Upload-Prozess. Die Implementierung eines Systems, das dauerhaft zugängliche Links unterstützt, ist erforderlich, um ein gleichbleibendes Benutzererlebnis zu bieten.
  
	  •	Skalierbare gleichzeitige Nutzung: Da mehrere Benutzer gleichzeitig auf die Anwendung zugreifen könnten, ist eine skalierbare Architektur erforderlich, die gleichzeitige Uploads und Downloads ohne Leistungseinbußen ermöglicht.
 
-Bildqualität und Dateiformat-Management:

  	•	Vielseitige Formatunterstützung: Um Kompatibilität sicherzustellen, muss die Anwendung verschiedene Bild-, Video- und Audioformate unterstützen.
   
    •	Qualitätserhaltung bei Komprimierung


# Marktanalyse

1. Compress JPEG/PNG/GIF/PDF compressing.com
   - bis zu 20 Bilddateien können zur selben Zeit komprimiert werden
   - ausschließlich auf Bilddateien beschränkt
   - kaum Struktur
   - unübersichtlich
   - Fokus auf Schlichtheit, User Experience (UX) leidet dennoch darunter
   
2. Online-umwandeln.de
   - Videodateien in nur 3 Schritten umwandeln
   - ausschließlich auf Videodateien beschränkt
   - sichtlich veraltetes Layout/Design
   - mangelhafte User Experience

3. Clideo
   - Videokomprimierung
   - wesentlich anschaulicher als bisherige Beispiele
   - Erwähnung der Features (unterstützte Dateiformate, Verschlüsselung, Ergebnisvorschau)
   - Möglichkeit, sich als Benutzer zu registrieren/annmelden
   - dennoch viel ungenutzter Raum

# Vergleich mit unserer Anwendung ShrinkIT

Nach genauerer Betrachtung des Markts fällt auf, dass die bestehenden Webanwendungen nahezu allesamt veraltet bzw. in die Jahre gekommen sind. Keine dieser Anwendungen ist responsive (ungeeignet für mobile Endgeräte) Zudem bieten keinerlei Anwendungen die Option sowohl Bild-, als auch Video- und Audioformate zu verkleinern. Unsere Webanwendung fokussiert sich dabei vor allem auf die Berücksichtigung aller Dateiformate mit einer modernen und anschaulichen Umsetzung. Das Feauture der Benutzerregistrierung wird ebenfalls verwendet, um es Kunden zu ermöglichen auf deren verkleinerte Dateien über einen personalisierten Link dauerhaft zuzugreifen.
  
# Concept Map
![Mind Map](https://github.com/user-attachments/assets/47538c59-5368-4282-bfef-dd220ebcedb2)

