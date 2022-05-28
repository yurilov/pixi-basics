// import { Container, Graphics, Loader } from "pixi.js";
// import { assets } from "../assets";

// export class LoaderScene extends Container {

//     private loaderBar: Container;
//     private loaderBarBorder: Graphics;
//     private loaderBarFill: Graphics;
//     constructor(screenWidth: number, screenHeight: number) {
//         super();

//         const loaderBarWidth = screenWidth * 0.8;
//         this.loaderBarFill = new Graphics();
//         this.loaderBarFill.beginFill(0x008800, 1)
//         this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
//         this.loaderBarFill.endFill();
//         this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

//         this.loaderBarBorder = new Graphics();
//         this.loaderBarBorder.lineStyle(10, 0x0, 1);
//         this.loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);

//         this.loaderBar = new Container();
//         this.loaderBar.addChild(this.loaderBarFill);
//         this.loaderBar.addChild(this.loaderBarBorder);
//         this.loaderBar.position.x = (screenWidth - this.loaderBar.width) / 2; 
//         this.loaderBar.position.y = (screenHeight - this.loaderBar.height) / 2;
//         this.addChild(this.loaderBar);


//         Loader.shared.add(assets);

//         Loader.shared.onProgress.add(this.downloadProgress, this);
//         Loader.shared.onComplete.once(this.gameLoaded, this);

//      
//         Loader.shared.load();
//     }

//     private downloadProgress(loader: Loader): void {
//         const progressRatio = loader.progress / 100;
//         this.loaderBarFill.scale.x = progressRatio;
//     }

//     private gameLoaded(): void {
//         this.removeChild(this.loaderBar);

//         // all your assets are ready! I would probably change to another scene
//         // ...but you could build your entire game here if you want
//         // (pls don't)
//     }
// }