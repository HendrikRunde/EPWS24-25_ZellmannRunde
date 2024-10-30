# EPWS24-25_ZellmannRunde
Entwicklungprojekt mit Schwerpunkt Web Development

# Projektkontext
Im Rahmen des Entwicklungsprojekts mit dem Schwerpunkt Web Development entwickeln wir eine Webapplikation, die es ermöglicht zu große Mediendateien zu verkleinern bzw. zu komprimieren bevor diese in einem CMS hochgeladen werden.

# Hintergrund
Content-Management-Systeme (CMS) sind wichtige Werkzeuge zur Verwaltung und Veröffentlichung digitaler Inhalte wie Bilder, Videos und Audio. Sie ermöglichen es Benutzern, Inhalte ohne technische Vorkenntnisse zu erstellen und zu pflegen. Bekannte Beispiele für CMS sind WordPress, Joomla! und Drupal. Obwohl CMS-Lösungen die Inhaltsverwaltung vereinfachen, führen große, unoptimierte Dateien häufig zu Performance-Problemen und belasten die Serverkapazitäten. Dies gilt insbesondere für Medieninhalte wie hochauflösende Bilder oder große Videodateien, die auf Websites und Plattformen veröffentlicht werden.

# Problemstellung
Durch die Verwendung von mobilen, hochauflösenden Endgeräten bzw. Kameras kommt es oftmals dazu, dass Kunden mit übergroßen Mediendateien arbeiten und diese dann in ein CMS hochladen. Dies führt jedoch zu Speicher- und Performance-Problemen oder aber dieser Vorgang wird sogar direkt vom CMS blockiert. Daher bedarf es einer Anwendung, welche dem Kunden eine unkomplizierte und benutzerfreundliche Optimierung ermöglicht.

# Lösungsansatz
Es bedarf zunächst einer vielseitigen Formatunterstützung jeglicher Bild-, Video- und Audioformate. Darüber hinaus wird eine benutzerfreundliche Oberfläche erwartet, die einen einfachen Upload-Prozess für Kunden ohne zusätzliche Konfiguration möglich macht. Die Implementierung eines Administrationsbereichs bietet die Möglichkeit flexible Konfigurationsmöglichkeiten und die Verwaltung von Kundenkonten. Zudem ist es von Vorteil mehrere Kunden gleichzeitig bedienen und somit größere Datenmengen zur selben Zeit verarbeiten zu können (Skalierbarkeit). Zuletzt ist auch die Sicherheit von großer Bedeutung. Die Speicherung bzw. Übertragung von Daten verlangt eine gewisse Sicherheit, genauso wie der Schutz vor unbefugtem Zugriff essentiell ist.

# Zielsetzung
Ziel des Projekts ist es, eine leistungsfähige Webanwendung zu entwickeln, die Nutzer ohne technische Vorkenntnisse dabei unterstützt, Mediendateien in geeigneter Größe und Qualität für den Einsatz in Content-Management-Systemen (CMS) bereitzustellen. Die Anwendung soll sicherstellen, dass Medieninhalte schnell und einfach optimiert werden können, um so die Performance und Effizienz der verwendeten CMS-Plattformen zu steigern. Das Projekt legt besonderen Wert auf Benutzerfreundlichkeit, Anpassungsfähigkeit und Datensicherheit und richtet sich an eine Zielgruppe, die im Arbeitsalltag regelmäßig Medieninhalte verwaltet und hochlädt.
# Zielgruppe
Verwalter/ Account-Manager

Verwalter/ Account-Manager sind Personen oder Unternehmen, die für die Verwaltung eines CMS und die Inhalte auf einer Website verantwortlich sind. Sie legen die Optimierungsvorgaben für die Dateiarten und -größen fest und verwalten den Kunden-Upload über personalisierte Links. Ihre Hauptanforderung ist es, sicherzustellen, dass große Dateien optimiert werden, bevor sie auf die Website geladen werden, um die Serverlast und die Ladezeiten der Website zu minimieren.

Kunden

Kunden sind die Benutzer, die regelmäßig Medieninhalte (Bilder, Videos, Audio) hochladen müssen. Sie haben oft wenig technisches Wissen und benötigen eine Lösung, die ihnen erlaubt, Dateien ohne manuelle Optimierungsschritte hochzuladen. Für sie ist es wichtig, dass der Prozess einfach, schnell und ohne zusätzliche Anpassungen funktioniert. Die Anwendung gibt ihnen die Möglichkeit, optimierte Dateien zu erhalten, die direkt ins CMS hochgeladen werden können.


# Tech Stack
- Frontend: Intuitive Benutzeroberfläche für den Upload und Download von Dateien. Realisierung mit Vue.js
- Backend: Verarbeitung der hochgeladenen Dateien, Durchführung der Optimierungsprozesse, Verwaltung von Kundenkonten und Speicherung der Ergebnisse. Verwendung von Nuxt.js für die Entwicklung des Backends.
-	Cloud-Infrastruktur: Skalierbare Cloud-Lösung für die Datenspeicherung mit Google Firebase (Realtime Database)
- Programmiersprachen: Verwendung von JavaScript bei der Implentierung der Anwendung mit Vue.js und Nuxt.js
- Frameworks: Nutzung von Web-Frameworks wie Bootstrap für die schnelle Entwicklung der Benutzeroberfläche.

# Mögliche Herausforderungen
- Handling großer Dateien
- Sicherheit (Datenschutz)
- Verfügbarkeit (über denselben Link)
- gleichzeitige Benutzung
  
# Concept Map
![Mind Map](https://github.com/user-attachments/assets/47538c59-5368-4282-bfef-dd220ebcedb2)

