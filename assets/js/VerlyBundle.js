! function(t) {
  var i = {};

  function s(e) {
    if (i[e]) return i[e].exports;
    var n = i[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return t[e].call(n.exports, n, n.exports, s), n.l = !0, n.exports
  }
  s.m = t, s.c = i, s.d = function(t, i, e) {
    s.o(t, i) || Object.defineProperty(t, i, {
      enumerable: !0,
      get: e
    })
  }, s.r = function(t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, s.t = function(t, i) {
    if (1 & i && (t = s(t)), 8 & i) return t;
    if (4 & i && "object" == typeof t && t && t.__esModule) return t;
    var e = Object.create(null);
    if (s.r(e), Object.defineProperty(e, "default", {
        enumerable: !0,
        value: t
      }), 2 & i && "string" != typeof t)
      for (var n in t) s.d(e, n, function(i) {
        return t[i]
      }.bind(null, n));
    return e
  }, s.n = function(t) {
    var i = t && t.__esModule ? function() {
      return t.default
    } : function() {
      return t
    };
    return s.d(i, "a", i), i
  }, s.o = function(t, i) {
    return Object.prototype.hasOwnProperty.call(t, i)
  }, s.p = "", s(s.s = 1)
}([function(t, i) {
  window.normalizedRandom = function() {
    return 2 * Math.random() - 1
  }, window.degreesToRad = function(t) {
    return t * (Math.PI / 180)
  }, window.clamp = function(t, i, s) {
    return Math.min(Math.max(t, Math.min(i, s), Math.max(i, s)))
  }, window.random = function(t, i, s) {
    return 1 === arguments.length ? Math.random() * arguments[0] : (2 == arguments.length && (s = i, i = t, t = Math.random), i || s ? s ? t() * (s - i) + i : (s = i, t() * s) : Math.random())
  }, window.lerp = function(t, i, s) {
    return (i - t) * s + t
  }
}, function(t, i, s) {
  "use strict";
  s.r(i);
  class e {
    constructor(t, i, s) {
      this.entities = t, this.draggedPoint = null, this.down = !1, this.coord = new Vector, this.offset = new Vector, this.offsetCoord = new Vector, this.canvas = i, this.ctx = s, this.canvas.addEventListener("mousedown", t => {
        this.down = !0, this.draggedPoint && (this.offset.setXY(t.offsetX - this.draggedPoint.pos.x, t.offsetY - this.draggedPoint.pos.y), this.offsetCoord = Vector.sub(this.coord, this.offset))
      }), this.canvas.addEventListener("mouseup", t => {
        this.draggedPoint && this.draggedPoint.resetVelocity(), this.down = !1, this.draggedPoint = null
      }), this.canvas.addEventListener("mousemove", t => {
        this.coord.setXY(t.offsetX, t.offsetY), this.offsetCoord = Vector.sub(this.coord, this.offset)
      }), this.canvas.addEventListener("touchstart", t => {
        let i = t.touches[0];
        this.down = !0, this.draggedPoint && (this.offset.setXY(i.clientX - this.draggedPoint.pos.x, i.clientY - this.draggedPoint.pos.y), this.offsetCoord = Vector.sub(this.coord, this.offset))
      }), this.canvas.addEventListener("touchend", t => {
        this.draggedPoint && this.draggedPoint.resetVelocity(), this.down = !1, this.draggedPoint = null
      }), this.canvas.addEventListener("touchmove", t => {
        let i = t.touches[0];
        this.coord.setXY(i.pageX, i.pageY), this.offsetCoord = Vector.sub(this.coord, this.offset)
      })
    }
    dragPoint() {
      this.down && this.draggedPoint.pos.setXY(this.offsetCoord.x, this.offsetCoord.y)
    }
    drag() {
      this.down || (this.draggedPoint = this.getNearestPoint()), this.draggedPoint && (this.renderDraggedPoint(this.draggedPoint), this.dragPoint())
    }
    renderDraggedPoint(t) {
      this.ctx.beginPath(), this.ctx.strokeStyle = "black", this.ctx.arc(t.pos.x, t.pos.y, 1.5 * t.radius, 0, 2 * Math.PI), this.ctx.stroke(), this.ctx.closePath()
    }
    getNearestPoint() {
      let t = null;
      for (let i = 0; i < this.entities.length; i++)
        for (let s = 0; s < this.entities[i].points.length; s++) {
          this.entities[i].points[s].pos.dist(this.coord) < 20 && (t = this.entities[i].points[s])
        }
      return t
    }
  }
  var n = class {
    constructor(t, i, s) {
      this.entities = [], this.iterations = t, this.currentFrame = 0, this.canvas = i, this.WIDTH = i.width, this.HEIGHT = i.height, this.ctx = s, this.mouse = new e(this.entities, this.canvas, this.ctx)
    }
    joinEntities(...t) {
      let i = new Entity(this.iterations, this),
        s = [],
        e = [];
      for (let i = 0; i < t.length; i++) {
        s.push(t[i].points), e.push(t[i].sticks);
        let n = this.entities.indexOf(t[i]);
        this.entities.splice(n, 1)
      }
      return s = [].concat.apply([], s), e = [].concat.apply([], e), i.points = s, i.sticks = e, this.addEntity(i), i
    }
    addEntity(t) {
      this.entities.push(t)
    }
    interact() {
      this.mouse.drag()
    }
    update() {
      for (let t = 0; t < this.entities.length; t++) this.entities[t].update();
      this.currentFrame++
    }
    renderPointIndex() {
      for (let t = 0; t < this.entities.length; t++) this.entities[t].renderPointIndex(this.ctx)
    }
    render() {
      for (let t = 0; t < this.entities.length; t++) this.entities[t].render(this.ctx)
    }
    createBox(t, i, s, e) {
      const n = new Entity(this.iterations, this);
      return n.addPoint(t, i, 0, 0), n.addPoint(t + s, i, 0, 0), n.addPoint(t + s, i + e, 0, 0), n.addPoint(t, i + e, 0, 0), n.addStick(0, 1), n.addStick(1, 2), n.addStick(2, 3), n.addStick(3, 0), n.addStick(3, 1), this.addEntity(n), n
    }
    createHexagon(t, i, s, e = 50, n = 1, h = 5) {
      const o = new Entity(this.iterations, this);
      let r = 2 * Math.PI / s;
      for (let n = 0; n < s; ++n) {
        let s = n * r;
        o.addPoint(t + Math.cos(s) * e, i + Math.sin(s) * e, 0, 0)
      }
      let d = o.addPoint(t, i, 0, 0);
      for (let t = 0; t < s; ++t) o.addStick(t, (t + n) % s), o.addStick(new Stick(o.points[t], d)), o.addStick(t, (t + h) % s);
      return this.addEntity(o), o
    }
    createCloth(t, i, s, e, n, h) {
      let o, r, d = new Entity(this.iterations, this),
        a = s / n,
        c = e / n;
      for (r = 0; r < n; ++r)
        for (o = 0; o < n; ++o) {
          let h = t + o * a - s / 2 + a / 2,
            l = i + r * c - e / 2 + c / 2;
          d.addPoint(h, l), o > 0 && d.addStick(r * n + o, r * n + o - 1), r > 0 && d.addStick(r * n + o, (r - 1) * n + o)
        }
      for (d.tear = function(t) {
          for (let i = 0; i < d.sticks.length; i++) d.sticks[i].startPoint.pos.dist(d.sticks[i].endPoint.pos) > (t || 20) && d.removeSticks(d.sticks[i].startPoint)
        }, o = 0; o < n; ++o) o % h == 0 && d.pin(o);
      return !this.dontPush && this.addEntity(d), d
    }
    createRope(t, i, s = 10, e = 15, n) {
      let h = new Entity(this.iterations, this);
      for (let n = 0; n < s; n++) h.addPoint(t + n * e, i, 0, 0);
      for (let t = 0; t < s - 1; t++) h.addStick(t, (t + 1) % s);
      return void 0 !== n && h.pin(n), this.addEntity(h), h
    }
    createRagdoll(t, i) {
      let s = new Entity(this.iterations, this);
      return s.addPoint(t, i).setRadius(15).setMass(5), s.addPoint(t, i + 100), s.addPoint(t + 30, i + 90), s.addPoint(t - 30, i + 90), s.addPoint(t + 20, i + 150), s.addPoint(t - 20, i + 150), s.addPoint(t + 30, i + 190).setRadius(10).setMass(20), s.addPoint(t - 30, i + 190).setRadius(10).setMass(20), s.addPoint(t, i + 25), s.addPoint(t + 25, i + 30), s.addPoint(t - 25, i + 30), s.addPoint(t + 15, i + 105).setRadius(10).setMass(5), s.addPoint(t - 15, i + 105).setRadius(10).setMass(5), s.addStick(0, 9), s.addStick(0, 10), s.addStick(9, 10), s.addStick(9, 2), s.addStick(10, 3), s.addStick(9, 3), s.addStick(10, 2), s.addStick(2, 6), s.addStick(3, 7), s.addStick(2, 7), s.addStick(3, 6), s.addStick(0, 1), s.addStick(2, 3), s.addStick(9, 2), s.addStick(10, 3), s.addStick(0, 4), s.addStick(0, 5), s.addStick(0, 6), s.addStick(0, 7), s.addStick(1, 2), s.addStick(1, 3), s.addStick(2, 4), s.addStick(3, 5), s.addStick(4, 6), s.addStick(5, 7), s.addStick(0, 8), s.addStick(8, 1), s.addStick(8, 9), s.addStick(9, 11), s.addStick(8, 10), s.addStick(10, 12), this.addEntity(s), s
    }
  };
  s(0);
  class h {
    constructor(t, i) {
      this.x = t || 0, this.y = i || 0
    }
    static dist(t, i) {
      return t.dist(i)
    }
    static distSq(t, i) {
      return t.distSq(i)
    }
    static sub(t, i) {
      return new h(t.x - i.x, t.y - i.y)
    }
    static add(t, i) {
      return new h(t.x + i.x, t.y + i.y)
    }
    static fromAngle(t) {
      let i = new h(0, 0);
      return i.x = Math.cos(t), i.y = Math.sin(t), i
    }
    static random2D() {
      return h.fromAngle(Math.random() * Math.PI * 180)
    }
    jitter(t, i) {
      var s = new h(t, i);
      return this.x += normalizedRandom() * s.x, this.y += normalizedRandom() * s.y, this
    }
    add(t, i) {
      return 1 === arguments.length ? (this.x += t.x, this.y += t.y) : 2 === arguments.length && (this.x += t, this.y += i), this
    }
    sub(t, i) {
      return 1 === arguments.length ? (this.x -= t.x, this.y -= t.y) : 2 === arguments.length && (this.x -= t, this.y -= i), this
    }
    mult(t) {
      return "number" == typeof t ? (this.x *= t, this.y *= t) : (this.x *= t.x, this.y *= t.y), this
    }
    div(t) {
      return "number" == typeof t ? (this.x /= t, this.y /= t) : (this.x /= t.x, this.y /= t.y), this
    }
    setAngle(t) {
      var i = this.mag();
      this.x = Math.cos(t) * i, this.y = Math.sin(t) * i
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    magSq() {
      return this.x * this.x + this.y * this.y
    }
    setXY(t, i) {
      return this.x = t, this.y = i, this
    }
    setMag(t) {
      return this.normalize(), this.mult(t), this
    }
    normalize() {
      let t = this.mag();
      return t > 0 && this.div(t), this
    }
    normalizeTo(t) {
      var i = this.mag();
      return i > 0 && (i = t / i, this.mult(i)), this
    }
    limit(t) {
      return this.mag() > t && (this.normalize(), this.mult(t)), this
    }
    heading() {
      return -Math.atan2(-this.y, this.x)
    }
    dist(t) {
      let i = this.x - t.x,
        s = this.y - t.y;
      return Math.sqrt(i * i + s * s)
    }
    distSq(t) {
      let i = this.x - t.x,
        s = this.y - t.y;
      return i * i + s * s
    }
    copy() {
      return new h(this.x, this.y)
    }
    negative() {
      return this.x = -this.x, this.y = -this.y, this
    }
    array() {
      return [this.x, this.y]
    }
    toString() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]"
    }
    project(t) {
      var i = (this.x * t.x + this.y * t.y) / (t.x * t.x + t.y * t.y);
      return this.x = i * t.x, this.y = i * t.y, this
    }
    rotate(t) {
      var i = this.heading() + t,
        s = this.mag();
      this.x = Math.cos(i) * s, this.y = Math.sin(i) * s
    }
  }
  var o = h;
  var r = class {
    constructor(t, i, s, e, n) {
      this.pos = new Vector(t, i), this.oldpos = new Vector(t + (s || 0), i + (e || 0)), this.bounce = .99, this.friction = .97, this.groundFriction = .7, this.gravity = new Vector(0, 1), this.pinned = !1, this.radius = n || 5, this.color = "#e62a4f", this.mass = 1, this.sticks = [], this.forceAcc = 1
    }
    setGravity(t) {
      return this.gravity = t, this
    }
    setFriction(t) {
      return this.friction = t, this
    }
    setGroundFriction(t) {
      return this.groundFriction = t, this
    }
    setBounce(t) {
      return this.bounce = t, this
    }
    setForceAcc(t) {
      return this.forceAcc = t, this
    }
    setMass(t) {
      return this.mass = t, this
    }
    setRadius(t) {
      return this.radius = t, this
    }
    setColor(t) {
      return this.color = t, this
    }
    setVelocity(t) {
      return this.oldpos.setXY(t.x, t.y), this
    }
    pin() {
      return this.pinned = !0, this
    }
    unpin() {
      return this.pinned = !1, this
    }
    resetVelocity() {
      this.oldpos.setXY(this.pos.x, this.pos.y)
    }
    rotate(t, i) {
      let s = i.x + (this.pos.x - i.x) * Math.cos(t) - (this.pos.y - i.y) * Math.sin(t),
        e = i.y + (this.pos.x - i.x) * Math.sin(t) + (this.pos.y - i.y) * Math.cos(t);
      this.pos.setXY(s, e)
    }
    resolveBehaviors(t, i = this.radius, s = this.forceAcc) {
      var e = Vector.sub(this.pos, t.pos),
        n = e.magSq();
      let h = i * i;
      if (n < h) {
        var o = e.normalizeTo(1 - n / h).mult(s);
        this.applyForce(o)
      }
    }
    applyForce(t) {
      this.pos.add(t)
    }
    addMotor(t, i, s, e, n) {
      this.pos.x = t + e * Math.cos(s * n), this.pos.y = i + e * Math.sin(s * n)
    }
    constrain(t) {
      this.pos.x > t.WIDTH - this.radius && (this.pos.x = t.WIDTH - this.radius), this.pos.x < this.radius && (this.pos.x = this.radius), this.pos.y > t.HEIGHT - this.radius && (this.pos.y = t.HEIGHT - this.radius), this.pos.y < this.radius && (this.pos.y = this.radius)
    }
    update(t) {
      if (this.pinned) return;
      let i = Vector.sub(this.pos, this.oldpos);
      if (i.mult(this.friction), this.pos.y >= t.HEIGHT - this.radius && i.magSq() > 1e-6) {
        var s = i.mag();
        i.x /= s, i.y /= s, i.mult(s * this.groundFriction)
      }
      this.oldpos.setXY(this.pos.x, this.pos.y), this.pos.add(i), this.pos.add(this.gravity)
    }
    render(t) {
      t.beginPath(), t.fillStyle = this.color, t.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI), t.fill(), t.closePath()
    }
  };
  var d = class {
    constructor(t, i, s, e, n) {
      this.startPoint = t, this.endPoint = i, this.stiffness = e || 2, this.color = "#f5476a", this.hidden = n, this.length = s || this.startPoint.pos.dist(this.endPoint.pos), this.startPoint.sticks.push(this), this.endPoint.sticks.push(this)
    }
    update(t) {
      let i = this.endPoint.pos.x - this.startPoint.pos.x,
        s = this.endPoint.pos.y - this.startPoint.pos.y,
        e = Math.sqrt(i * i + s * s),
        n = (this.length - e) / e * this.stiffness,
        h = i * n * .5,
        o = s * n * .5,
        r = this.startPoint.mass + this.endPoint.mass,
        d = this.startPoint.mass / r;
      r = this.endPoint.mass / r, this.startPoint.pinned || (this.startPoint.pos.x -= h * r, this.startPoint.pos.y -= o * r), this.endPoint.pinned || (this.endPoint.pos.x += h * d, this.endPoint.pos.y += o * d)
    }
    setColor(t) {
      return this.color = t, this
    }
    setLength(t) {
      return this.length = t, this
    }
    setStiffness(t) {
      return this.stiffness = t, this
    }
    setHidden(t) {
      return this.hidden = t, this
    }
    render(t) {
      this.hidden || (t.beginPath(), t.strokeStyle = this.color, t.moveTo(this.startPoint.pos.x, this.startPoint.pos.y), t.lineTo(this.endPoint.pos.x, this.endPoint.pos.y), t.stroke(), t.closePath())
    }
  };
  var a = class {
    constructor(t, i) {
      this.points = [], this.sticks = [], this.verlyInstance = i, this.iterations = t || 16
    }
    setGravity(t) {
      for (let i = 0; i < this.points.length; i++) this.points[i].setGravity(t)
    }
    setFriction(t) {
      for (let i = 0; i < this.points.length; i++) this.points[i].setFriction(t)
    }
    pin(t) {
      this.points[t].pin()
    }
    removeSticks(t) {
      this.sticks.splice(this.sticks.indexOf(t.sticks[0]), 1), t.sticks.splice(0, 1)
    }
    setVelocity(t, i) {
      this.points.map(s => {
        s.oldpos.x += t, s.oldpos.y += i
      })
    }
    addPoint(t, i, s, e, n) {
      let h;
      return h = t instanceof Point ? t : new Point(t, i, s, e, n), this.points.push(h), h
    }
    addStick(t, i, s, e, n) {
      let h;
      return h = t instanceof Stick ? t : new Stick(this.points[t], this.points[i], s, e, n), this.sticks.push(h), h
    }
    updatePoints() {
      for (let t = 0; t < this.points.length; t++) this.points[t].update(this.verlyInstance)
    }
    updateSticks(t) {
      for (let i = 0; i < this.sticks.length; i++) this.sticks[i].update(t)
    }
    updateConstraints() {
      for (let t = 0; t < this.points.length; t++) this.points[t].constrain(this.verlyInstance)
    }
    update() {
      this.updatePoints();
      for (let t = 0; t < this.iterations; ++t) this.updateSticks(), this.updateConstraints()
    }
    renderPoints() {
      for (let t = 0; t < this.points.length; t++) this.points[t].render(this.verlyInstance.ctx)
    }
    renderSticks() {
      for (let t = 0; t < this.sticks.length; t++) this.sticks[t].render(this.verlyInstance.ctx)
    }
    renderPointIndex() {
      for (let t = 0; t < this.points.length; t++) this.verlyInstance.ctx.beginPath(), this.verlyInstance.ctx.fillStyle = "black", this.verlyInstance.ctx.fillText(t, this.points[t].pos.x + 5, this.points[t].pos.y - 6), this.verlyInstance.ctx.closePath()
    }
    render() {
      this.renderPoints(), this.renderSticks()
    }
  };
  var c = class {
    constructor(t, i, s, e, n) {
      this.x = t, this.y = i, this.size = s, this.stickDistance = this.size, this.iterations = 50, this.A = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1]
      ], this.B = [
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0]
      ], this.C = [
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0]
      ], this.D = [
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0]
      ], this.E = [
        [0, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0]
      ], this.S = [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 0, 0]
      ], this.I = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0]
      ], this.K = [
        [1, 0, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 1, 1, 0]
      ], this.U = [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
      ], this.N = [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 1, 1]
      ], this.R = [
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0]
      ], this.G = [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
      ], this.L = [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ], this.Y = [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0]
      ], this.V = [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
      ], this.X = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ], this.P = [
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0]
      ], this.H = [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1]
      ], this.O = [
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0]
      ], this.letters = {
        A: this.A,
        B: this.B,
        C: this.C,
        D: this.D,
        E: this.E,
        K: this.K,
        I: this.I,
        S: this.S,
        U: this.U,
        N: this.N,
        R: this.R,
        G: this.G,
        L: this.L,
        Y: this.Y,
        V: this.V,
        X: this.X,
        P: this.P,
        H: this.H,
        O: this.O
      };
      let h = this.letters[e];
      this.text = new Entity(this.iterations, n);
      for (let t = 0; t < h.length; t++)
        for (let i = 0; i < h[t].length; i++)
          if (1 == h[i][t]) {
            let s = new Point(this.x + t * this.size, this.y + i * this.size);
            s.setRadius(2), this.text.addPoint(s)
          } for (let t = 0; t < this.text.points.length; t++)
        for (let i = 0; i < this.text.points.length && this.text.points[t] != this.text.points[i]; i++) {
          let s = this.text.points[t].pos.dist(this.text.points[i].pos);
          s > 0 && s < this.size + this.stickDistance && this.text.addStick(t, i)
        }
    }
  };
  window.Verly = n, window.Vector = o, window.Point = r, window.Stick = d, window.Entity = a, window.TypoGraphy = c;
  i.default = n
}]);
