class Vector {
    
    public x:number;
    public y:number;
    
    constructor(x:number = 0, y:number = 0){
        this.x = x;
        this.y = y;
    }
    
    add = (v: Vector):void => {
        this.x += v.x;
        this.y += v.y;
    }
    
    static add = (v1:Vector, v2:Vector):Vector => {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    
    sub = (v:Vector):void => {
        this.x -= v.x;
        this.y -= v.y;
    }
    
    static sub = (v1:Vector, v2:Vector):Vector => {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    
    mult = (s:number):void => {
        this.x *= s;
        this.y *= s;
    }
    
    static mult = (v:Vector, s:number):Vector => {
        return new Vector(v.x * s, v.y * s);
    }
    
    div = (s:number):void => {
        this.x /= s;
        this.y /= s;
    }
    
    static div = (v:Vector, s:number):Vector => {
        return new Vector(v.x / s, v.y / s);
    }
    
    mag = ():number => {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    limit = (max: number):void => {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }
    
    normalize = () => {
        let m = this.mag();
        if(m != 0){
            this.div(m);            
        }
    }
    
    static getDistance(v1: Vector, v2:Vector){
        let v = Vector.sub(v2, v1);
        return v.mag();
    }
    
}