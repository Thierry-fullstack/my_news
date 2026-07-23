<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\String\Slugger\SluggerInterface;

class AppCategoryFixtures extends Fixture
{
    private int $cpt = 1;
    public function __construct(private readonly SluggerInterface $slugger){}
    public function load(ObjectManager $manager): void
    {
        $parent = $this->createCategory('Information',null,$manager);
            $this->createCategory('Politique',$parent,$manager);
            $this->createCategory('Economie',$parent,$manager);
            $this->createCategory('Stratégie',$parent,$manager);
            $this->createCategory('International',$parent,$manager);
            $this->createCategory('Innovation',$parent,$manager);


        $manager->flush();

    }

    public function createCategory(string $name,Category $parent = null,ObjectManager $manager): Category
    {
        $categorie = new Category();
        $categorie->setName($name)
                  ->setCategory($parent);
        $categorie->setSlug($this->slugger->slug($categorie->getName())->lower());
        $manager->persist($categorie);

        $this->addReference($this->cpt,$categorie);
        $this->cpt++;
        return $categorie;
    }
}
