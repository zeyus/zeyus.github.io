/**
 * Get a "local" image and return it as a module default.
 * This is done by simply matching the path part of the image src to the path of the current page.
 * This can be done because the assets directory mirrors the path.
 * e.g. /src/_assets/_vault/sauna/01.jpg will match https://site/_vault/sauna
 * 
 * @param src The src of the image, usually just the final image name e.g. "01.jpg"
 * @param path The path of the current page, e.g. "/_vault/sauna"
 * @param imageModules The imageModules object from the layout load function
 * @returns The default export of the image module.
 * 
 */
const assetPrefix = '/_assets';
const imagePrefix = '/images';
export const imageToSrc = (src: string, path: string) => {
    // const pathParts = path.split('/').length;
    // add ../ for each part of the path
    // const prefix = Array(pathParts).fill('..').join('/');
    return `${assetPrefix}${imagePrefix}${path}/${src}`;
}

export const imageToModuleDefault = (src: string, path: string, imageModules: Record<string, any>) => {
    const imagePath = imageToSrc(src, path);
    const module = imageModules[imagePath];
    if (!module) {
        throw new Error(`Image module not found for ${imagePath}`);
    }
    return module.default;
};
