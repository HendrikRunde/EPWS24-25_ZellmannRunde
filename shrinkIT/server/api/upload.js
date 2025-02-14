import { eventHandler, readMultipartFormData } from 'h3'
import { resolve } from 'path'
import { promises as fs } from 'fs'

export default eventHandler(async (event) => {
  // Lese die Formulardaten
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Keine Datei hochgeladen'
    })
  }

  // Finde die hochgeladene Datei im Formulardaten
  const file = formData.find((field) => field.name === 'file')
  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dateifeld fehlt'
    })
  }

  // Definiere das Upload-Verzeichnis
  const uploadDir = resolve('uploads')
  await fs.mkdir(uploadDir, { recursive: true })

  // Definiere den Dateipfad
  const filePath = resolve(uploadDir, file.filename)
  await fs.writeFile(filePath, file.data)

  // Antwort zurücksenden
  return { message: 'Datei erfolgreich hochgeladen', path: filePath }
})
