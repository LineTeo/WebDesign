// game.js - ゲームメインロジック
class TankBattleGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 定数
        this.GRID_SIZE = 20;
        this.CELL_SIZE = 35;
        this.PANEL_WIDTH = this.GRID_SIZE * this.CELL_SIZE;
        this.PANEL_HEIGHT = this.GRID_SIZE * this.CELL_SIZE + 150;
        
        this.FRIEND_SIDE = 0;
        this.ENEMY_SIDE = 1;
        
        // ゲーム状態
        this.tanks = [];
        this.selectedIndex = 0;
        this.selectedTank = null;
        
        // イベントリスナー設定
        this.setupEventListeners();
        
        // ゲーム開始
        this.startGame();
        this.draw();
    }
    
    startGame() {
        this.tanks = [];
        this.tanks.push(new Tiger("タイガー", this.FRIEND_SIDE, 3, 3));
        this.tanks.push(new MediumTank("シャーマン１号", this.ENEMY_SIDE, 16, 3));
        this.tanks.push(new HeavyTank("シャーマン２号", this.ENEMY_SIDE, 3, 16));
        this.tanks.push(new MediumTank("シャーマン３号", this.ENEMY_SIDE, 16, 16));
        
        this.selectedIndex = 0;
        this.selectedTank = this.tanks[0];
    }
    
    setupEventListeners() {
        // キーボード操作
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // マウスクリック
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }
    
    handleKeyPress(e) {
        if (!this.selectedTank || !this.selectedTank.isAlive()) return;
        
        const oldX = this.selectedTank.x;
        const oldY = this.selectedTank.y;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.selectedTank.rotate(0);
                if (this.selectedTank.y > 0) {
                    this.selectedTank.move(oldX, oldY - 1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedTank.rotate(180);
                if (this.selectedTank.y < this.GRID_SIZE - 1) {
                    this.selectedTank.move(oldX, oldY + 1);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.selectedTank.rotate(270);
                if (this.selectedTank.x > 0) {
                    this.selectedTank.move(oldX - 1, oldY);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.selectedTank.rotate(90);
                if (this.selectedTank.x < this.GRID_SIZE - 1) {
                    this.selectedTank.move(oldX + 1, oldY);
                }
                break;
            case ' ':  // スペースキー
                e.preventDefault();
                this.endTurn();
                break;
            case 'r':
            case 'R':
                this.selectedTank.repair();
                break;
        }
        
        this.draw();
    }
    
    handleClick(e) {
        if (!this.selectedTank || !this.selectedTank.isAlive()) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const gridX = Math.floor(clickX / this.CELL_SIZE);
        const gridY = Math.floor(clickY / this.CELL_SIZE);
        
        // クリックした位置の戦車を探す
        for (let target of this.tanks) {
            if (target !== this.selectedTank && target.isAlive()) {
                if (Math.floor(target.x) === gridX && Math.floor(target.y) === gridY) {
                    this.selectedTank.attackTarget(target);
                    this.draw();
                    this.checkGameEnd();
                    return;
                }
            }
        }
    }
    
    endTurn() {
        if (!confirm('ターン終了しますか？')) {
            return;
        }
        
        this.selectedIndex++;
        
        // 敵のターン
        while (this.selectedIndex < this.tanks.length) {
            this.selectedTank = this.tanks[this.selectedIndex];
            
            if (this.selectedTank.isAlive() && this.selectedTank.side === this.ENEMY_SIDE) {
                this.enemyAI(this.selectedTank);
                this.selectedTank.resetActivity();
                this.draw();
                
                if (this.checkGameEnd()) {
                    return;
                }
            }
            
            this.selectedIndex++;
        }
        
        // プレイヤーのターン
        this.selectedIndex = 0;
        this.selectedTank = this.tanks[0];
        this.selectedTank.resetActivity();
        this.draw();
    }
    
    enemyAI(enemyTank) {
        const playerTank = this.tanks[0];
        const healthRatio = enemyTank.hp / enemyTank.maxHp;
        
        if (healthRatio <= 0.3) {
            // HP30%以下なら修理
            enemyTank.repair();
        } else {
            // プレイヤーに接近して攻撃
            const dx = playerTank.x - enemyTank.x;
            const dy = playerTank.y - enemyTank.y;
            
            // 2回移動
            if (Math.abs(dx) > Math.abs(dy)) {
                const newX = enemyTank.x + (dx > 0 ? 1 : -1);
                if (newX >= 0 && newX < this.GRID_SIZE) {
                    enemyTank.move(newX, enemyTank.y);
                }
            } else {
                const newY = enemyTank.y + (dy > 0 ? 1 : -1);
                if (newY >= 0 && newY < this.GRID_SIZE) {
                    enemyTank.move(enemyTank.x, newY);
                }
            }
            
            // もう一度移動
            const dx2 = playerTank.x - enemyTank.x;
            const dy2 = playerTank.y - enemyTank.y;
            
            if (Math.abs(dx2) > Math.abs(dy2)) {
                const newX = enemyTank.x + (dx2 > 0 ? 1 : -1);
                if (newX >= 0 && newX < this.GRID_SIZE) {
                    enemyTank.move(newX, enemyTank.y);
                }
            } else {
                const newY = enemyTank.y + (dy2 > 0 ? 1 : -1);
                if (newY >= 0 && newY < this.GRID_SIZE) {
                    enemyTank.move(enemyTank.x, newY);
                }
            }
            
            // 攻撃
            enemyTank.attackTarget(playerTank);
        }
    }
    
    checkGameEnd() {
        let friendCount = 0;
        let enemyCount = 0;
        
        for (let tank of this.tanks) {
            if (tank.isAlive()) {
                if (tank.side === this.FRIEND_SIDE) friendCount++;
                else enemyCount++;
            }
        }
        
        if (friendCount === 0 || enemyCount === 0) {
            const msg = friendCount === 0 ? 
                "戦車が破壊されました...\n敗北" : 
                "敵を殲滅しました！\n勝利！";
            
            setTimeout(() => {
                if (confirm(msg + "\n\nもう一度プレイしますか？")) {
                    this.startGame();
                    this.draw();
                }
            }, 100);
            
            return true;
        }
        
        return false;
    }
    
    // ======================================================================
    // 描画処理
    // ======================================================================
    
    draw() {
        // 背景クリア
        this.ctx.fillStyle = '#f0f0dc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // グリッド描画
        this.drawGrid();
        
        // 戦車描画
        for (let i = 0; i < this.tanks.length; i++) {
            const tank = this.tanks[i];
            if (tank.isAlive()) {
                const isSelected = (i === this.selectedIndex);
                this.drawTank(tank, isSelected);
            }
        }
        
        // 情報パネル描画
        this.drawInfoPanel();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#c8c8b4';
        this.ctx.lineWidth = 1;
        
        // グリッド線
        for (let i = 0; i <= this.GRID_SIZE; i++) {
            // 縦線
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.CELL_SIZE, 0);
            this.ctx.lineTo(i * this.CELL_SIZE, this.GRID_SIZE * this.CELL_SIZE);
            this.ctx.stroke();
            
            // 横線
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.CELL_SIZE);
            this.ctx.lineTo(this.GRID_SIZE * this.CELL_SIZE, i * this.CELL_SIZE);
            this.ctx.stroke();
        }
        
        // 外枠
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, this.GRID_SIZE * this.CELL_SIZE, this.GRID_SIZE * this.CELL_SIZE);
    }
    
    drawTank(tank, isSelected) {
        const pixelX = tank.x * this.CELL_SIZE + this.CELL_SIZE / 2;
        const pixelY = tank.y * this.CELL_SIZE + this.CELL_SIZE / 2;
        
        this.ctx.save();
        this.ctx.translate(pixelX, pixelY);
        this.ctx.rotate(tank.angle * Math.PI / 180);
        
        const size = this.CELL_SIZE - 8;
        const halfSize = size / 2;
        
        // 選択中の強調
        if (isSelected) {
            this.ctx.strokeStyle = '#ffff00';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, halfSize + 5, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // 戦車の色（HP依存）
        const hpRatio = tank.hp / tank.maxHp;
        let tankColor;
        if (hpRatio > 0.7) tankColor = '#228b22';
        else if (hpRatio > 0.3) tankColor = '#b8860b';
        else tankColor = '#b22222';
        
        // キャタピラ
        this.ctx.fillStyle = '#323232';
        this.ctx.fillRect(-halfSize, -halfSize + 3, 5, size - 6);
        this.ctx.fillRect(halfSize - 5, -halfSize + 3, 5, size - 6);
        
        // 本体
        this.ctx.fillStyle = tankColor;
        this.ctx.fillRect(-halfSize + 3, -halfSize + 5, size - 6, size - 10);
        
        // 砲塔
        const turretSize = size / 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, turretSize / 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 砲身
        this.ctx.strokeStyle = '#505050';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -halfSize - 3);
        this.ctx.stroke();
        
        // 縁取り
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(-halfSize + 3, -halfSize + 5, size - 6, size - 10);
        
        this.ctx.restore();
        
        // HPバー
        this.drawHealthBar(pixelX, pixelY - halfSize - 10, size, tank);
        
        // 名前
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 10px "MS Gothic"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(tank.name, pixelX, pixelY + halfSize + 15);
    }
    
    drawHealthBar(x, y, width, tank) {
        const barHeight = 5;
        const hpRatio = tank.hp / tank.maxHp;
        
        // 背景（赤）
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(x - width/2, y, width, barHeight);
        
        // HP（緑）
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(x - width/2, y, width * hpRatio, barHeight);
        
        // 枠
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - width/2, y, width, barHeight);
    }
    
    drawInfoPanel() {
        const panelY = this.GRID_SIZE * this.CELL_SIZE;
        
        // 背景
        this.ctx.fillStyle = '#323232';
        this.ctx.fillRect(0, panelY, this.PANEL_WIDTH, 150);
        
        if (this.selectedTank && this.selectedTank.isAlive()) {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px "MS Gothic"';
            this.ctx.textAlign = 'left';
            
            let textX = 20;
            let textY = panelY + 25;
            
            this.ctx.fillText(`【選択中】 ${this.selectedTank.name}`, textX, textY);
            textY += 20;
            this.ctx.fillText(`HP: ${this.selectedTank.hp}/${this.selectedTank.maxHp}`, textX, textY);
            textY += 20;
            this.ctx.fillText(`攻撃力: ${this.selectedTank.attack}  防御力: ${this.selectedTank.defense}`, textX, textY);
            textY += 20;
            this.ctx.fillText(`位置: (${this.selectedTank.x.toFixed(1)}, ${this.selectedTank.y.toFixed(1)})  角度: ${this.selectedTank.angle}°`, textX, textY);
            textY += 20;
            this.ctx.fillText(`弾薬: ${this.selectedTank.ammo}`, textX, textY);
            textY += 20;
            this.ctx.fillText(`行動力: ${this.selectedTank.activity}`, textX, textY);
        }
        
        // 操作説明
        this.ctx.fillStyle = '#ffff00';
        this.ctx.font = '11px "MS Gothic"';
        
        let helpX = this.PANEL_WIDTH - 280;
        let helpY = panelY + 20;
        
        this.ctx.fillText('【操作】', helpX, helpY);
        helpY += 18;
        this.ctx.fillText('矢印キー: 移動　　　必要行動力　１', helpX, helpY);
        helpY += 18;
        this.ctx.fillText('クリック: 敵を攻撃  必要行動力　４', helpX, helpY);
        helpY += 18;
        this.ctx.fillText('Ｒ： 修理 　　　　　残存行動力すべて', helpX, helpY);
        helpY += 18;
        this.ctx.fillText('スペース: 行動終了', helpX, helpY);
    }
}

// ゲーム開始
window.addEventListener('load', () => {
    new TankBattleGame();
});
