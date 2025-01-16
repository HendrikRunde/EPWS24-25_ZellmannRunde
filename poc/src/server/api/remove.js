import { eventHandler } from 'h3'
import { resolve } from 'path'
import { promises as fs } from 'fs'

export default eventHandler(async (event) => {
  // Lese die URL-Abfrageparameter
  const url = new URL(event.node.req.url, `http://${event.node.req.headers.host}`)
  const filename = url.searchParams.get('filename')

  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dateiname fehlt'
    })
  }

  // Definiere den Dateipfad
  const filePath = resolve('uploads', filename)

  try {
    // Lösche die Datei
    await fs.unlink(filePath)
    return { message: 'Datei erfolgreich gelöscht', path: filePath }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Fehler beim Löschen der Datei',
      data: err.message
    })
  }
})
