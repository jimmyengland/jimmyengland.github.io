"""
File: asteroids.py
Original Author: Br. Burton
Designed to be completed by others
This program implements the asteroids game.
"""
import arcade
import random
import math
from abc import ABC, abstractmethod

# These are Global constants to use throughout the game
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

BULLET_RADIUS = 30
BULLET_SPEED = 10
BULLET_LIFE = 60

SHIP_TURN_AMOUNT = 3
SHIP_THRUST_AMOUNT = 0.25
SHIP_RADIUS = 30
SHIP_LIVES = 3

INITIAL_ROCK_COUNT = 5

BIG_ROCK_SPIN = 1
BIG_ROCK_SPEED = 1.5
BIG_ROCK_RADIUS = 15

MEDIUM_ROCK_SPIN = -2
MEDIUM_ROCK_RADIUS = 5

SMALL_ROCK_SPIN = 5
SMALL_ROCK_RADIUS = 2

class Point:
    """
    This class drives the point
    """
    def __init__(self):
        self.x = 0
        self.y = 0
        
class Velocity:
    
    def __init__(self):
        self.dx = 0
        self.dy = 0
        
class Cool_Down:
    def __init__(self):
        self.cool_down = 0
        self.text = "Cool Down: {}".format(self.cool_down)
        cooldown_x = SCREEN_WIDTH // 2.5
        cooldown_y = SCREEN_HEIGHT // 2
        
    def advance():
        if self.cool_down > 0:
            self.cool_down -= 1
            self.text = "Cool Down: {}".format(self.cool_down)
            arcade.draw_text(cooldown, cooldown_x,cooldown_y, font_size=30, color=arcade.color.GREEN)
        
class FlyingOBJ(ABC):
    def __init__(self, img):
        self.center = Point()
        self.velocity = Velocity()
        self.alive = True
        self.img = img
        self.texture = arcade.load_texture(self.img)
        self.width = self.texture.width
        self.height = self.texture.height
        self.radius = SHIP_RADIUS
        self.angle = 0
        self.speed = 0
        self.direction = 0
        self.alpha = 255
    
    def advance(self):
        self.wrap()
        self.center.y += self.velocity.dy
        self.center.x += self.velocity.dx
        
    def is_alive(self):
        return self.alive
    
    def draw(self):
        arcade.draw_texture_rectangle(self.center.x, self.center.y, self.width, self.height,
                                      self.texture, self.angle, self.alpha)
        
    def wrap(self):
        if self.center.x > SCREEN_WIDTH:
            self.center.x -= SCREEN_WIDTH
        if self.center.x < 0:
            self.center.x += SCREEN_WIDTH
        if self.center.y > SCREEN_HEIGHT:
            self.center.y -= SCREEN_HEIGHT
        if self.center.y < 0:
            self.center.y += SCREEN_HEIGHT

class Ship_Parts(FlyingOBJ):
    def __init__(self, img):
        super().__init__(img)
        self.radius = 0.0

class Ship(Ship_Parts):
    def __init__(self):
        super().__init__("images/playerShip1_orange.png")
        self.angle = 1
        self.center.x = (SCREEN_WIDTH/2)
        self.center.y = (SCREEN_HEIGHT/2)
        self.radius = SHIP_RADIUS

        
    def left(self):
        self.angle += SHIP_TURN_AMOUNT
    
    def right(self):
        self.angle -= SHIP_TURN_AMOUNT
    
    def thrust(self):
        self.velocity.dx -= math.sin(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        self.velocity.dy += math.cos(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        
    def brake(self):
        self.velocity.dx += math.sin(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        self.velocity.dy -= math.cos(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        
    def break_apart(self, ship):
        self.alpha = 0
        
        ship_center = Ship_Broken()
        ship_center.angle = self.angle
        ship_center.center.x = self.center.x
        ship_center.center.y = self.center.y
        ship_center.velocity.dy = self.velocity.dy
        ship_center.velocity.dx = self.velocity.dx
        ship.append(ship_center)
        
        ship_wing1 = Ship_Wing1()
        ship_wing1.angle = self.angle
        ship_wing1.center.x = self.center.x
        ship_wing1.center.y = self.center.y
        ship_wing1.velocity.dy = self.velocity.dy - 1
        ship_wing1.velocity.dx = self.velocity.dx
        ship.append(ship_wing1)
        
        ship_wing2 = Ship_Wing2()
        ship_wing2.angle = self.angle
        ship_wing2.center.x = self.center.x
        ship_wing2.center.y = self.center.y
        ship_wing2.velocity.dy = self.velocity.dy + 1
        ship_wing2.velocity.dx = self.velocity.dx
        ship.append(ship_wing2)
        

        
        
class Ship_Broken(Ship_Parts):
    def __init__(self):
        super().__init__("images/ship_break_center.png")
        self.velocity.dx += math.sin(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        self.velocity.dy -= math.cos(math.radians(self.angle)) * SHIP_THRUST_AMOUNT

        
    def advance(self):
        super().advance()
        
    def wrap(self):
        pass

class Ship_Wing1(Ship_Parts):
    def __init__(self):
        super().__init__("images/ship_break_lt_wing.png")
        self.velocity.dx += math.sin(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        self.velocity.dy -= math.cos(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        
    def advance(self):
        super().advance()
        
    def wrap(self):
        pass

class Ship_Wing2(Ship_Parts):
    def __init__(self):
        super().__init__("images/ship_break_rt_wing.png")
        self.velocity.dx += math.sin(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        self.velocity.dy -= math.cos(math.radians(self.angle)) * SHIP_THRUST_AMOUNT
        
    def advance(self):
        super().advance()
        
    def wrap(self):
        pass

class Bullet(FlyingOBJ):
    def __init__(self,ship_angle,ship_x,ship_y):
        super().__init__("images/laserBlue01.png")
        self.radus = BULLET_RADIUS
        self.life = BULLET_LIFE
        self.speed = BULLET_SPEED
        self.angle = ship_angle-90
        self.center.x = ship_x
        self.center.y = ship_y

    def fire(self):
        self.velocity.dx -= math.sin(math.radians(self.angle+90)) * BULLET_SPEED
        self.velocity.dy += math.cos(math.radians(self.angle+90)) * BULLET_SPEED
        
    def advance(self):
        super().advance()
        self.life -= 1
        if self.life <= 0:
            self.alive = 0
        
class Asteroid(FlyingOBJ):
    def __init__(self, img):
        super().__init__(img)
        self.radius = 0.0
        
class SmallRock(Asteroid):
    def __init__(self):
        super().__init__("images/meteorGrey_small1.png")
        self.radius = SMALL_ROCK_RADIUS
        self.speed = BIG_ROCK_SPEED
        self.velocity.dx = math.cos(math.radians(self.direction)) * self.speed
        self.velocity.dy = math.sin(math.radians(self.direction)) * self.speed
        
    def advance(self):
        super().advance()
        self.angle += SMALL_ROCK_SPIN
        
    def break_apart(self,asteroids):
        self.alive = False
        
 
class MediumRock(Asteroid):
    def __init__(self):
        super().__init__("images/meteorGrey_med1.png")
        self.radius = MEDIUM_ROCK_RADIUS
        self.speed = BIG_ROCK_SPEED
        self.velocity.dx = math.cos(math.radians(self.direction)) * self.speed
        self.velocity.dy = math.sin(math.radians(self.direction)) * self.speed
        
        
    def advance(self):
        super().advance()
        self.angle += MEDIUM_ROCK_SPIN
        
    def break_apart(self, asteroids):
        small1 = SmallRock()
        small1.center.x = self.center.x
        small1.center.y = self.center.y
        small1.velocity.dy = self.velocity.dy + 1+5
        
        small2 = SmallRock()
        small2.center.x = self.center.x
        small2.center.y = self.center.y
        small2.velocity.dy = self.velocity.dy - 2
                
        asteroids.append(small1)
        asteroids.append(small2)
        self.alive = False

        
class LargeRock(Asteroid):
    def __init__(self):
        super().__init__("images/meteorGrey_big1.png")
        self.center.x = random.randint(1,50)
        self.center.y = random.randint(1,150)
        self.direction = random.randint(1,360)
        self.speed = BIG_ROCK_SPEED
        self.radius = BIG_ROCK_RADIUS
        self.velocity.dx = math.cos(math.radians(self.direction)) * self.speed
        self.velocity.dy = math.sin(math.radians(self.direction)) * self.speed
        
        
    def advance(self):
        super().advance()
        self.angle += BIG_ROCK_SPIN
        
    def break_apart(self, asteroids):
        med1 = MediumRock()
        med1.center.x = self.center.x
        med1.center.y = self.center.y
        med1.velocity.dy = self.velocity.dy + 2
        
        med2 = MediumRock()
        med2.center.x = self.center.x
        med2.center.y = self.center.y
        med2.velocity.dy = self.velocity.dy - 2
        
        small = SmallRock()
        small.center.x = self.center.x
        small.center.y = self.center.y
        small.velocity.dy = self.velocity.dy + 5
        
        asteroids.append(med1)
        asteroids.append(med2)
        asteroids.append(small)
        self.alive = False
        

        



class Game(arcade.Window):
    """
    This class handles all the game callbacks and interaction
    This class will then call the appropriate functions of
    each of the above classes.
    You are welcome to modify anything in this class.
    """

    def __init__(self, width, height):
        """
        Sets up the initial conditions of the game
        :param width: Screen width
        :param height: Screen height
        """
        super().__init__(width, height)
        arcade.set_background_color(arcade.color.SMOKY_BLACK)

        self.held_keys = set()
        self.ship = Ship()
        self.lives = 3
        self.bullets = []
        self.Ship_Parts = []
        self.cool_down = Cool_Down()

        # TODO: declare anything here you need the game class to track
        self.asteroids = []
        for i in range(INITIAL_ROCK_COUNT):
            bigAst = LargeRock()
            self.asteroids.append(bigAst)


    def on_draw(self):
        """
        Called automatically by the arcade framework.
        Handles the responsibility of drawing all elements.
        """

        # clear the screen to begin drawing
        arcade.start_render()

        # TODO: draw each object
        for asteroid in self.asteroids:
            asteroid.draw()

        for bullet in self.bullets:
            bullet.draw()
            
        for ship in self.Ship_Parts:
            ship.draw()

        self.ship.draw()
        self.draw_lives()
        
        if self.cool_down > 0:
            self.cool_down.advance()
        
        
    def draw_lives(self):
        lives_text = "Ship Lives {}".format(self.lives)
        start_x = 10
        start_y = SCREEN_HEIGHT - 20
        ship_dead_x = SCREEN_WIDTH // 2.5
        ship_dead_y = SCREEN_HEIGHT // 2
        dead_text = "Game Over!"
        quit_text = "Press Q to quit"
        
        arcade.draw_text(lives_text, start_x=start_x, start_y=start_y, font_size=12, color=arcade.color.WHITE)
        
        if self.lives == 0:
            arcade.draw_text(dead_text, ship_dead_x,ship_dead_y, font_size=30, color=arcade.color.RED)
            arcade.draw_text(quit_text, ship_dead_x+15,ship_dead_y-20, font_size=20, color=arcade.color.RED)


            
    def remove_notAliveObjects(self):
        for bullet in self.bullets:
            if not bullet.alive:
                self.bullets.remove(bullet)
        for asteroid in self.asteroids:
            if not asteroid.alive:
                self.asteroids.remove(asteroid)
    
    def check_collisions(self):
        for bullet in self.bullets:
            for asteroid in self.asteroids:
                if ((bullet.alive) and (asteroid.alive)):
                    distance_x = abs(asteroid.center.x - bullet.center.x)
                    distance_y = abs(asteroid.center.y - bullet.center.y)
                    max_dist = asteroid.radius + bullet.radius
                    if ((distance_x < max_dist) and (distance_y < max_dist)):
                        asteroid.break_apart(self.asteroids)
                        bullet.alive = False
      

        for asteroid in self.asteroids:           
            if ((self.ship.alive) and (asteroid.alive)):
                distance_x = abs(asteroid.center.x - self.ship.center.x)
                distance_y = abs(asteroid.center.y - self.ship.center.y)
                max_dist = asteroid.radius + self.ship.radius
                if ((distance_x < max_dist) and (distance_y < max_dist)):
                    if self.lives >=  1:
                        self.lives -= 1
                        
                    else:
                        self.ship.break_apart(self.Ship_Parts)
                        self.ship.alive = False
        

    def update(self, delta_time):
        """
        Update each object in the game.
        :param delta_time: tells us how much time has actually elapsed
        """

        self.check_keys()

        # TODO: Tell everything to advance or move forward one step in time
        for asteroid in self.asteroids:
            asteroid.advance()
            
        self.ship.advance()
        
        for bullet in self.bullets:
            bullet.advance()
            
        for ship in self.Ship_Parts:
            ship.advance()
            
        self.remove_notAliveObjects()

                
        # TODO: Check for collisions
        self.check_collisions()

    def check_keys(self):
        """
        This function checks for keys that are being held down.
        You will need to put your own method calls in here.
        """
        if arcade.key.LEFT in self.held_keys:
            self.ship.left()

        if arcade.key.RIGHT in self.held_keys:
            self.ship.right()


        if arcade.key.UP in self.held_keys:
            self.ship.thrust()

        if arcade.key.DOWN in self.held_keys:
            self.ship.brake()
            
#         if arcade.key.R in self.held_keys:
#             self.ship.alive = True
            
        

        # Machine gun mode...
        #if arcade.key.SPACE in self.held_keys:
        #    pass


    def on_key_press(self, key: int, modifiers: int):
        """
        Puts the current key in the set of keys that are being held.
        You will need to add things here to handle firing the bullet.
        """        
        
        if self.ship.alive:
            self.held_keys.add(key)

            if key == arcade.key.SPACE:
                # TODO: Fire the bullet here!
                bullet = Bullet(self.ship.angle, self.ship.center.x,self.ship.center.y)
                self.bullets.append(bullet)
                bullet.fire()
         
        else:
            if key == arcade.key.Q:
                arcade.close_window()

#         if key == arcade.key.R:
#             self.__init__(SCREEN_WIDTH, SCREEN_HEIGHT)

    def on_key_release(self, key: int, modifiers: int):
        """
        Removes the current key from the set of held keys.
        """
        if key in self.held_keys:
            self.held_keys.remove(key)


# Creates the game and starts it going
window = Game(SCREEN_WIDTH, SCREEN_HEIGHT)
arcade.run()
