import { existsSync, statSync, createReadStream } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const worksRoot = path.resolve('F:/jh/各模块作品')
const selectedVideosRoot = path.resolve('F:/jh/筛选的作品视频')
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
}

function localWorksPlugin() {
  const handleRootRequest = (req, res, root, prefix) => {
    const requestPath = decodeURIComponent((req.url || '').split('?')[0])
    const relativePath = requestPath.slice(prefix.length).replace(/^\/+/, '')
    const filePath = path.resolve(root, relativePath)
    const isInsideRoot = filePath.toLowerCase().startsWith(`${root.toLowerCase()}${path.sep}`)
    if (!isInsideRoot || !existsSync(filePath) || !statSync(filePath).isFile()) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    const { size } = statSync(filePath)
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    const range = req.headers.range
    res.setHeader('Content-Type', contentType)
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Cache-Control', 'public, max-age=3600')

    if (range) {
      const [rangeStart, rangeEnd] = range.replace(/bytes=/, '').split('-')
      const start = Number.parseInt(rangeStart, 10)
      const end = rangeEnd ? Number.parseInt(rangeEnd, 10) : size - 1
      res.statusCode = 206
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
      res.setHeader('Content-Length', end - start + 1)
      if (req.method !== 'HEAD') createReadStream(filePath, { start, end }).pipe(res)
      else res.end()
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Length', size)
    if (req.method !== 'HEAD') createReadStream(filePath).pipe(res)
    else res.end()
  }

  return {
    name: 'local-works-source',
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').startsWith('/works/')) handleRootRequest(req, res, worksRoot, '/works/')
        else if ((req.url || '').startsWith('/selected-videos/')) handleRootRequest(req, res, selectedVideosRoot, '/selected-videos/')
        else next()
      })
    },
    configurePreviewServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').startsWith('/works/')) handleRootRequest(req, res, worksRoot, '/works/')
        else if ((req.url || '').startsWith('/selected-videos/')) handleRootRequest(req, res, selectedVideosRoot, '/selected-videos/')
        else next()
      })
    },
  }
}

export default defineConfig({ plugins: [react(), localWorksPlugin()] })
