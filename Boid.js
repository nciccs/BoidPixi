class Boid
{
    constructor(x, y, boundaryWidth, boundaryHeight)
    {
        this.boundaryWidth = boundaryWidth;
        this.boundaryHeight = boundaryHeight;

        this.position = new Vector(x, y);

        let randX = (Math.random() * 2) - 1;
        let randY = (Math.random() * 2) - 1;
        this.velocity = new Vector(randX, randY);

        this.acceleration = new Vector(0, 0);
        this.r = 8.0;

        this.separationDistance = 20;
        this.alignmentDistance = 50;
        this.cohesionDistance = 50;

        this.maxSpeed = 2;

        this.separationForce = 0.03;
        this.alignmentForce = 0.03;
        this.cohesionForce = 0.03;

        this.seperationWeight = 1;
        this.alignmentWeight = 1;
        this.cohesionWeight = 1;
    }

    run(boids)
    {
        this.flock(boids);
        this.update();
        this.borders();
        //this.render();
    }

    flock(boids)
    {
        let sep = this.separation(boids);
        let ali = this.alignment(boids);
        let coh = this.cohesion(boids);

        sep.multiplyNum(this.seperationWeight);
        ali.multiplyNum(this.alignmentWeight);
        coh.multiplyNum(this.cohesionWeight);

        this.acceleration.add(sep);
        this.acceleration.add(ali);
        this.acceleration.add(coh);
    }

    separation(boids)
    {
        let steer = new Vector(0, 0);
        let count = 0;
        for(let i = 0; i < boids.length; i++)
        {
            //let d = p5.Vector.dist(this.position, boids[i].position);
            //let d = p5.Vector.subtract(this.position, boids[i].position).magnitudeSq();
            let d = Vector.subtract(this.position, boids[i].position).magnitudeSq();
            //if(0 < d && d < this.separationDistance)
            if(0 < d && d < this.separationDistance*this.separationDistance)
            {
                let diff = Vector.subtract(this.position, boids[i].position);
                diff.normalize();
                diff.divideNum(d);
                steer.add(diff);
                count++;
            }
        }

        if(count > 0)
        {
            steer.divideNum(count);
        }

        if(steer.magnitudeSq() > 0)
        {
            steer.normalize();
            steer.multiplyNum(this.maxSpeed);

            steer.subtract(this.velocity);
            steer.limit(this.separationForce);
        }

        return steer;
    }

    alignment(boids)
    {
        let steer = new Vector(0, 0);
        let count = 0;
        for(let i = 0; i < boids.length; i++)
        {
            //let d = p5.Vector.dist(this.position, boids[i].position);
            let d = Vector.subtract(this.position, boids[i].position).magnitudeSq();
            //if(0 < d && d < this.alignmentDistance)
            if(0 < d && d < this.alignmentDistance*this.alignmentDistance)
            {
                steer.add(boids[i].velocity);
                count++;
            }
        }

        if(count > 0)
        {
            steer.divideNum(count);

            steer.normalize();
            steer.multiplyNum(this.maxSpeed);

            steer.subtract(this.velocity);
            steer.limit(this.alignmentForce);
        }

        return steer;
    }

    cohesion(boids)
    {
        let steer = new Vector(0, 0);
        let count = 0;
        for(let i = 0; i < boids.length; i++)
        {
            //let d = p5.Vector.dist(this.position, boids[i].position);
            let d = Vector.subtract(this.position, boids[i].position).magnitudeSq();
            //if(0 < d && d < this.separationDistance)
            if(0 < d && d < this.cohesionDistance*this.cohesionDistance)
            {
                steer.add(boids[i].position);
                count++;
            }
        }

        if(count > 0)
        {
            steer.divideNum(count);

            steer.subtract(this.position);

            steer.normalize();
            steer.multiplyNum(this.maxSpeed);

            steer.subtract(this.velocity);
            steer.limit(this.cohesionForce);
        }

        return steer;
    }

    update()
    {
        this.velocity.add(this.acceleration);
        //limit speed supposed to go here
        this.position.add(this.velocity);
        this.acceleration.multiplyNum(0);
    }

    borders()
    {
        if(this.position.x < 0)
            this.position.x = this.boundaryWidth-1;
        if(this.position.y < 0)
            this.position.y = this.boundaryHeight-1;
        if(this.position.x >= this.boundaryWidth)
            this.position.x = 0;
        if(this.position.y >= this.boundaryHeight)
            this.position.y = 0;
    }

    render()
    {
        push();   
        translate(this.position.x, this.position.y);
        angleMode(DEGREES);
        rotate(this.velocity.heading()+90);
        let y = Boid.calcPythagorasB(this.r, this.r/2);
        triangle(0, -this.r, -this.r/2, y, this.r/2, y);
        pop();
    }

    static calcPythagorasB(sideC, sideA)
    {
        return Math.sqrt(sideC*sideC - sideA*sideA);
    }
}