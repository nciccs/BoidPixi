class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector)
    {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    static subtract(vector1, vector2)
    {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    multiply(vector)
    {
        this.x *= vector.x;
        this.y *= vector.y;
    }

    divide(vector)
    {
        this.x /= vector.x;
        this.y /= vector.y;
    }

    multiplyNum(number)
    {
        this.x *= number;
        this.y *= number;
    }

    divideNum(number)
    {
        this.x /= number;
        this.y /= number;
    }

    magnitude()
    {
        return Math.sqrt(this.magnitudeSq());
    }

    magnitudeSq()
    {
        return this.x * this.x + this.y * this.y;
    }

    normalize()
    {
        let mag = this.magnitude();

        this.x /= mag;
        this.y /= mag;
    }

    limit(maxMag, multiplier=maxMag)
    {
        if(this.magnitude() > maxMag)
        {
            this.normalize();
            this.multiplyNum(multiplier);
        }
    }

    limitSq(maxMag, multiplier=maxMag)
    {
        if(this.magnitudeSq() > (maxMag*maxMag))
        {
            this.normalize();
            this.multiplyNum(multiplier);
        }
    }

    rotation()
    {
        return Math.atan2(this.y, this.x);
    }

    angle()
    {
        return this.rotation() * 180 / Math.PI;
    }
}