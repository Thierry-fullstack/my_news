<?php

namespace App\DataFixtures;

use App\Entity\Keyword;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\String\Slugger\SluggerInterface;

class AppKeywordFixtures extends Fixture
{
    private int $cpt = 1;
    public function __construct(private readonly SluggerInterface $slugger){}
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for($i = 0; $i < 30; $i++ )
        {
            $keyword = new Keyword();
            $keyword->setName($faker->word());
            $keyword->setSlug($this->slugger->slug($keyword->getName())->lower());
            $manager->persist($keyword);

            $this->addReference($this->cpt,$keyword);
            $this->cpt++;
        }

        $manager->flush();
    }
}
