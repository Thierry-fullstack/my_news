<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260719121414 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE keyword_post (keyword_id INT NOT NULL, post_id INT NOT NULL, INDEX IDX_BDDCE18F115D4552 (keyword_id), INDEX IDX_BDDCE18F4B89032C (post_id), PRIMARY KEY (keyword_id, post_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE keyword_post ADD CONSTRAINT FK_BDDCE18F115D4552 FOREIGN KEY (keyword_id) REFERENCES keyword (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE keyword_post ADD CONSTRAINT FK_BDDCE18F4B89032C FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE keyword_post DROP FOREIGN KEY FK_BDDCE18F115D4552');
        $this->addSql('ALTER TABLE keyword_post DROP FOREIGN KEY FK_BDDCE18F4B89032C');
        $this->addSql('DROP TABLE keyword_post');
    }
}
