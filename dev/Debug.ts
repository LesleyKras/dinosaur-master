class Debug {
    
    
     
    public static draw(){
        if(Handler.player.isAlive){
            Handler.renderer.fillStyle = 'rgba(255, 0, 0, .4)';
            Handler.renderer.fillRect(
            Handler.player.position.x + Handler.player.CollisionBox.offsetX - Handler.activeCamera.position.x, 
            Handler.player.position.y + Handler.player.CollisionBox.offsetY - Handler.activeCamera.position.y, 
            Handler.player.CollisionBox.width, 
            Handler.player.CollisionBox.height);
        }

        for(let n=0; n < Handler.pickups.length; n++){
            Handler.renderer.fillStyle = 'rgba(0, 0, 255, .4)';
            if(Handler.pickups[n].CollisionBox != null){
                Handler.renderer.fillRect(
                Handler.pickups[n].position.x + Handler.pickups[n].CollisionBox.offsetX - Handler.activeCamera.position.x, 
                Handler.pickups[n].position.y + Handler.pickups[n].CollisionBox.offsetY - Handler.activeCamera.position.y, 
                Handler.pickups[n].CollisionBox.width, 
                Handler.pickups[n].CollisionBox.height);
            }
        }
            
        for(let n=0; n<Handler.enemies.length; n++){
            Handler.renderer.fillStyle = 'rgba(255, 0, 0, .4)';
            if(Handler.enemies[n].CollisionBox != null && Handler.enemies[n].isAlive){
                Handler.renderer.fillRect(
                Handler.enemies[n].position.x + Handler.enemies[n].CollisionBox.offsetX - Handler.activeCamera.position.x, 
                Handler.enemies[n].position.y + Handler.enemies[n].CollisionBox.offsetY - Handler.activeCamera.position.y, 
                Handler.enemies[n].CollisionBox.width, 
                Handler.enemies[n].CollisionBox.height);
            }
            
            if(Handler.player.isAlive && Handler.enemies[n].isAlive){
                if(Handler.enemies[n].inRange){
                    Handler.renderer.beginPath();
                    Handler.renderer.moveTo(Handler.player.center.x - Handler.activeCamera.position.x, Handler.player.center.y - Handler.activeCamera.position.y);
                    Handler.renderer.lineTo(Handler.enemies[n].center.x - Handler.activeCamera.position.x, Handler.enemies[n].center.y - Handler.activeCamera.position.y);
                    Handler.renderer.closePath();
                    if(Handler.enemies[n].inAttackRange){
                        Handler.renderer.strokeStyle = 'green';
                    } else {
                        Handler.renderer.strokeStyle = 'red';
                    }

                    Handler.renderer.stroke();
                }
            }
            
        }
        
        Handler.renderer.fillStyle = 'rgba(0, 0, 0, 0.5)';
        Handler.renderer.fillRect(10, 10, 200, 300);
        Handler.renderer.fillStyle = 'rgb(100, 250, 100)';
        Handler.renderer.textAlign = 'left';
        Handler.renderer.font = '13px Arial';
        Handler.renderer.fillText('x: ' + Math.floor(Handler.player.position.x)+ ', y: ' + Math.floor(Handler.player.position.y), 30, 48);
        Handler.renderer.fillText('onGround: ' + Handler.player.onGround, 30, 64);
        Handler.renderer.fillText('isAlive: ' + Handler.player.isAlive, 30, 80);
        Handler.renderer.fillText('playerHealth: ' + Handler.player.health + '/' + Handler.player.maxHealth, 30, 96);
        Handler.renderer.fillText('canAttack: ' + Handler.player.canAttack, 30, 112);
        Handler.renderer.fillText('coins: ' + Handler.player.coins, 30, 128);
    }
}