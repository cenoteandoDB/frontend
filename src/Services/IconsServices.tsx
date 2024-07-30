const iconModules = import.meta.glob('../assets/cenoteando-icons/*.svg', { eager: true });

const iconFileNames = Object.keys(iconModules).map(fileName => fileName.replace('../assets/cenoteando-icons/', ''));

export default iconFileNames;