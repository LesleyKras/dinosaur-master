class Assets {
    public static loadImage = (filename: string) => {
        let path = 'images/' + filename;
        let img = new Image();
        img.src = path;
        return img;
    }
}