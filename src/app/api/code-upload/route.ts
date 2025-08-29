import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, you'd use a database
const uploadedFiles: Array<{
  id: string;
  name: string;
  type: string;
  content: string;
  isEditable: boolean;
  lastModified: string;
  size: number;
}> = []

export async function GET() {
  return NextResponse.json({ files: uploadedFiles })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    const content = await file.text()
    const fileType = getFileType(file.name)
    
    const newFile = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: fileType,
      content: content,
      isEditable: true,
      lastModified: new Date().toISOString(),
      size: file.size
    }

    uploadedFiles.push(newFile)

    return NextResponse.json({ 
      success: true, 
      file: newFile,
      message: 'Dosya başarıyla yüklendi'
    })
  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, content } = await request.json()
    
    const fileIndex = uploadedFiles.findIndex(file => file.id === id)
    if (fileIndex === -1) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 404 }
      )
    }

    uploadedFiles[fileIndex] = {
      ...uploadedFiles[fileIndex],
      content,
      lastModified: new Date().toISOString()
    }

    return NextResponse.json({ 
      success: true, 
      file: uploadedFiles[fileIndex],
      message: 'Dosya başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Dosya güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Dosya ID\'si gerekli' },
        { status: 400 }
      )
    }

    const fileIndex = uploadedFiles.findIndex(file => file.id === id)
    if (fileIndex === -1) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 404 }
      )
    }

    const deletedFile = uploadedFiles.splice(fileIndex, 1)[0]

    return NextResponse.json({ 
      success: true, 
      message: 'Dosya başarıyla silindi',
      deletedFile
    })
  } catch (error) {
    console.error('Dosya silme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya silinirken hata oluştu' },
      { status: 500 }
    )
  }
}

function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'html': return 'html'
    case 'css': return 'css'
    case 'js': return 'js'
    case 'jsx': return 'jsx'
    case 'tsx': return 'tsx'
    case 'ts': return 'ts'
    case 'json': return 'json'
    case 'md': return 'markdown'
    case 'txt': return 'text'
    default: return 'component'
  }
}
