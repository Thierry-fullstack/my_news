<?php

namespace App\DataFixtures;

use App\Entity\Portrait;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppUserFixtures extends Fixture
{

    public function __construct(UserPasswordHasherInterface $hasher, private int $cpt =1){
        $this->hasher = $hasher;
    }
    public function load(ObjectManager $manager): void
    {

        for($i = 0; $i <=10; $i++) {
            $faker = Factory::create('fr_Fr');
            $user = new User();
            $user->setEmail($faker->email());
            $i % 2 !==0 ? $user->setRoles(['ROLE_AUTHOR']):$user->setRoles(['ROLE_USER']);
            $user->setCreatedAt(new DateTimeImmutable());
            $i % 2 === 0 ?
                $user->setPseudo($faker->firstNameFemale . ' ' . $faker->firstName) : $user->setPseudo($faker->firstNameMale . ' ' . $faker->firstName());
            $user->setIsVerified(true);
            $user->getRoles()==['ROLE_USER'] ? $user->setIsLetter(true) : $user->setIsLetter(false);
            $user->setPassword($this->hasher->hashPassword($user, 'ArethiA75!'));
            $portrait = new Portrait();
            $portrait->setName('portrait.webp');
            $portrait->setAlt($user->getEmail());
            $user->setPortrait($portrait);
            $manager->persist($user);

            $this->addReference($this->cpt,$user);
            $this->cpt++;
        }

        $manager->flush();
    }
}
