/**
 * Serviço para gerenciamento de arquivos
 * Em um ambiente de produção, este serviço seria substituído por um 
 * que interage com um backend real para armazenar e gerenciar arquivos
 */

const FILE_STORAGE_KEY = 'exclusiva_files';

// Estrutura de pastas padrão
const DEFAULT_FOLDERS = [
  { id: 'images', name: 'Imagens', parentId: null },
  { id: 'documents', name: 'Documentos', parentId: null },
  { id: 'seo', name: 'SEO', parentId: 'images' },
  { id: 'blog', name: 'Blog', parentId: 'images' },
  { id: 'team', name: 'Equipe', parentId: 'images' },
  { id: 'logos', name: 'Logos', parentId: 'images' },
  { id: 'banners', name: 'Banners', parentId: 'images' },
  { id: 'pdfs', name: 'PDFs', parentId: 'documents' },
  { id: 'contracts', name: 'Contratos', parentId: 'documents' }
];

// Arquivos de exemplo pré-carregados
const DEFAULT_FILES = [
  {
    id: 'sharing-image',
    name: 'sharing-image.jpg',
    type: 'image/jpeg',
    size: 124500,
    folderId: 'seo',
    path: '/images/sharing-image.jpg',
    dateUploaded: '2025-07-10T14:30:00Z',
    dimensions: { width: 1200, height: 630 }
  },
  {
    id: 'favicon',
    name: 'favicon.ico',
    type: 'image/x-icon',
    size: 4500,
    folderId: 'seo',
    path: '/favicon.ico',
    dateUploaded: '2025-07-10T14:35:00Z'
  },
  {
    id: 'logo',
    name: 'logo.png',
    type: 'image/png',
    size: 24800,
    folderId: 'logos',
    path: '/images/logo.png',
    dateUploaded: '2025-07-10T14:40:00Z',
    dimensions: { width: 250, height: 80 }
  },
  {
    id: 'contrato-modelo',
    name: 'contrato-modelo.pdf',
    type: 'application/pdf',
    size: 245000,
    folderId: 'contracts',
    path: '/documents/contrato-modelo.pdf',
    dateUploaded: '2025-07-15T10:20:00Z'
  }
];

/**
 * Inicializar o serviço de arquivos com dados padrão se não existirem
 */
const initialize = () => {
  if (typeof window !== 'undefined') {
    // Verificar se já existem dados no localStorage
    const storedData = localStorage.getItem(FILE_STORAGE_KEY);
    
    if (!storedData) {
      // Se não existir, inicializar com dados padrão
      const initialData = {
        folders: DEFAULT_FOLDERS,
        files: DEFAULT_FILES
      };
      
      localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(initialData));
    }
  }
};

/**
 * Obter todos os arquivos e pastas
 * @returns {Object} Objeto contendo arrays de arquivos e pastas
 */
const getAllFiles = () => {
  if (typeof window === 'undefined') {
    return { folders: [], files: [] };
  }
  
  const storedData = localStorage.getItem(FILE_STORAGE_KEY);
  if (!storedData) {
    initialize();
    return {
      folders: DEFAULT_FOLDERS,
      files: DEFAULT_FILES
    };
  }
  
  return JSON.parse(storedData);
};

/**
 * Obter arquivos por pasta
 * @param {string} folderId ID da pasta
 * @returns {Array} Lista de arquivos na pasta
 */
const getFilesByFolder = (folderId) => {
  const { files } = getAllFiles();
  return files.filter(file => file.folderId === folderId);
};

/**
 * Obter pasta por ID
 * @param {string} folderId ID da pasta
 * @returns {Object|null} Dados da pasta ou null se não encontrada
 */
const getFolderById = (folderId) => {
  const { folders } = getAllFiles();
  return folders.find(folder => folder.id === folderId) || null;
};

/**
 * Obter subpastas de uma pasta
 * @param {string|null} parentId ID da pasta pai (null para pastas de nível superior)
 * @returns {Array} Lista de subpastas
 */
const getSubfolders = (parentId) => {
  const { folders } = getAllFiles();
  return folders.filter(folder => folder.parentId === parentId);
};

/**
 * Obter arquivo por ID
 * @param {string} fileId ID do arquivo
 * @returns {Object|null} Dados do arquivo ou null se não encontrado
 */
const getFileById = (fileId) => {
  const { files } = getAllFiles();
  return files.find(file => file.id === fileId) || null;
};

/**
 * Criar nova pasta
 * @param {Object} folderData Dados da pasta
 * @returns {Object} Pasta criada
 */
const createFolder = async (folderData) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Gerar ID único para a pasta
  const folderId = `folder_${Date.now()}`;
  
  const newFolder = {
    id: folderId,
    name: folderData.name,
    parentId: folderData.parentId || null,
    dateCreated: new Date().toISOString()
  };
  
  // Adicionar a nova pasta à lista
  const updatedFolders = [...folders, newFolder];
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders: updatedFolders,
    files
  }));
  
  return newFolder;
};

/**
 * Simula o upload de um arquivo
 * @param {Object} fileData Dados do arquivo
 * @returns {Object} Arquivo criado
 */
const uploadFile = async (fileData) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { folders, files } = getAllFiles();
  
  // Gerar ID único para o arquivo
  const fileId = `file_${Date.now()}`;
  
  // Determinar o caminho do arquivo com base na pasta
  const folder = folders.find(f => f.id === fileData.folderId);
  let filePath = '';
  
  // Construir o caminho com base na estrutura de pastas
  if (folder) {
    if (folder.id === 'images' || folder.parentId === 'images') {
      filePath = `/images/${fileData.name}`;
    } else if (folder.id === 'documents' || folder.parentId === 'documents') {
      filePath = `/documents/${fileData.name}`;
    } else {
      filePath = `/${fileData.name}`;
    }
  }
  
  const newFile = {
    id: fileId,
    name: fileData.name,
    type: fileData.type,
    size: fileData.size,
    folderId: fileData.folderId,
    path: filePath,
    dateUploaded: new Date().toISOString(),
    dimensions: fileData.dimensions
  };
  
  // Adicionar o novo arquivo à lista
  const updatedFiles = [...files, newFile];
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders,
    files: updatedFiles
  }));
  
  return newFile;
};

/**
 * Renomear arquivo
 * @param {string} fileId ID do arquivo
 * @param {string} newName Novo nome do arquivo
 * @returns {Object} Arquivo atualizado
 */
const renameFile = async (fileId, newName) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Encontrar e atualizar o arquivo
  const updatedFiles = files.map(file => {
    if (file.id === fileId) {
      // Manter a extensão original
      const extension = file.name.split('.').pop();
      const nameWithoutExt = newName.includes('.') ? newName : `${newName}.${extension}`;
      
      // Atualizar o caminho
      const filePath = file.path.replace(file.name, nameWithoutExt);
      
      return {
        ...file,
        name: nameWithoutExt,
        path: filePath
      };
    }
    return file;
  });
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders,
    files: updatedFiles
  }));
  
  return updatedFiles.find(file => file.id === fileId);
};

/**
 * Mover arquivo para outra pasta
 * @param {string} fileId ID do arquivo
 * @param {string} newFolderId ID da nova pasta
 * @returns {Object} Arquivo atualizado
 */
const moveFile = async (fileId, newFolderId) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Encontrar o arquivo e a nova pasta
  const targetFile = files.find(file => file.id === fileId);
  const targetFolder = folders.find(folder => folder.id === newFolderId);
  
  if (!targetFile || !targetFolder) {
    throw new Error('Arquivo ou pasta não encontrados');
  }
  
  // Atualizar o caminho do arquivo com base na nova pasta
  let newPath = '';
  if (targetFolder.id === 'images' || targetFolder.parentId === 'images') {
    newPath = `/images/${targetFile.name}`;
  } else if (targetFolder.id === 'documents' || targetFolder.parentId === 'documents') {
    newPath = `/documents/${targetFile.name}`;
  } else {
    newPath = `/${targetFile.name}`;
  }
  
  // Atualizar o arquivo
  const updatedFiles = files.map(file => {
    if (file.id === fileId) {
      return {
        ...file,
        folderId: newFolderId,
        path: newPath
      };
    }
    return file;
  });
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders,
    files: updatedFiles
  }));
  
  return updatedFiles.find(file => file.id === fileId);
};

/**
 * Renomear pasta
 * @param {string} folderId ID da pasta
 * @param {string} newName Novo nome da pasta
 * @returns {Object} Pasta atualizada
 */
const renameFolder = async (folderId, newName) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Encontrar e atualizar a pasta
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return {
        ...folder,
        name: newName
      };
    }
    return folder;
  });
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders: updatedFolders,
    files
  }));
  
  return updatedFolders.find(folder => folder.id === folderId);
};

/**
 * Excluir arquivo
 * @param {string} fileId ID do arquivo
 * @returns {boolean} true se excluído com sucesso
 */
const deleteFile = async (fileId) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Filtrar arquivos para remover o arquivo alvo
  const updatedFiles = files.filter(file => file.id !== fileId);
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders,
    files: updatedFiles
  }));
  
  return true;
};

/**
 * Excluir pasta (apenas se vazia)
 * @param {string} folderId ID da pasta
 * @returns {boolean} true se excluída com sucesso
 */
const deleteFolder = async (folderId) => {
  // Simulação de operação assíncrona
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { folders, files } = getAllFiles();
  
  // Verificar se a pasta está vazia
  const filesInFolder = files.filter(file => file.folderId === folderId);
  const subfoldersInFolder = folders.filter(folder => folder.parentId === folderId);
  
  if (filesInFolder.length > 0 || subfoldersInFolder.length > 0) {
    throw new Error('A pasta não está vazia');
  }
  
  // Filtrar pastas para remover a pasta alvo
  const updatedFolders = folders.filter(folder => folder.id !== folderId);
  
  // Salvar no localStorage
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({
    folders: updatedFolders,
    files
  }));
  
  return true;
};

/**
 * Obter URL pública de um arquivo
 * @param {string} fileId ID do arquivo
 * @returns {string|null} URL do arquivo ou null se não encontrado
 */
const getPublicUrl = (fileId) => {
  const file = getFileById(fileId);
  if (!file) return null;
  
  // Em um ambiente real, aqui retornaríamos a URL completa para o arquivo
  // Para simulação, vamos retornar o caminho relativo
  return file.path;
};

/**
 * Procurar arquivos por nome
 * @param {string} searchTerm Termo de busca
 * @returns {Array} Arquivos correspondentes
 */
const searchFiles = (searchTerm) => {
  if (!searchTerm) return [];
  
  const { files } = getAllFiles();
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return files.filter(file => 
    file.name.toLowerCase().includes(lowercaseSearchTerm)
  );
};

const fileService = {
  initialize,
  getAllFiles,
  getFilesByFolder,
  getFolderById,
  getSubfolders,
  getFileById,
  createFolder,
  uploadFile,
  renameFile,
  moveFile,
  renameFolder,
  deleteFile,
  deleteFolder,
  getPublicUrl,
  searchFiles
};

export default fileService;
