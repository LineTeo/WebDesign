// tank.js - 戦車クラス
class Tank {
    constructor(name, side, x, y, maxHp = 100, attack = 30, defense = 10) {
        this.name = name;
        this.side = side;  // 0: 味方, 1: 敵
        this.x = x;
        this.y = y;
        this.angle = 0;
        
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.defense = defense;
        this.ammo = 20;
        this.maxActivity = 10;
        this.activity = 10;
    }
    
    isAlive() {
        return this.hp > 0;
    }
    
    move(newX, newY) {
        if (this.activity >= 1) {
            this.x = newX;
            this.y = newY;
            this.activity -= 1;
        }
    }
    
    rotate(angle) {
        this.angle = angle;
    }
    
    attackTarget(target) {
        if (this.activity >= 4 && this.ammo > 0) {
            const damage = Math.max(this.attack - target.defense, 0);
            target.hp -= damage;
            this.ammo--;
            this.activity -= 4;
            
            console.log(`${this.name}が${target.name}に${damage}ダメージ！`);
            
            if (target.hp <= 0) {
                target.hp = 0;
                console.log(`${target.name}が破壊された！`);
            }
        }
    }
    
    repair() {
        const healAmount = Math.min(20, this.maxHp - this.hp);
        this.hp += healAmount;
        this.activity = 0;
    }
    
    resetActivity() {
        this.activity = this.maxActivity;
    }
    
    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// 戦車の種類
class Tiger extends Tank {
    constructor(name, side, x, y) {
        super(name, side, x, y, 150, 50, 30);  // 高HP、高攻撃、高防御
    }
}

class MediumTank extends Tank {
    constructor(name, side, x, y) {
        super(name, side, x, y, 100, 30, 10);  // バランス型
    }
}

class HeavyTank extends Tank {
    constructor(name, side, x, y) {
        super(name, side, x, y, 120, 35, 20);  // やや重装甲
    }
}