class preloader{
    ImageArray;
    preloaded;
    constructor(ImageArray: string[]){
        this.preloaded = [];
        this.ImageArray = ImageArray;
        ImageArray.forEach(image => {
            this.loadImages(image);
        });
        return this.ImageArray;
    }
    loadImages(image){
        var img = new Image();
        img.src = image;
        this.preloaded.push(img);
    }
}