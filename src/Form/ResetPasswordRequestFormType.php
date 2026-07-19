<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Sequentially;

class ResetPasswordRequestFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email',EmailType::class,['attr'=>['class'=>'form-control text-primary-emphasis'],'required'=>true,
                'label'=>'Email *',
                'label_attr'=>['class'=>'form-check-label text-warning-emphasis','id'=>'label_email'],
                'constraints'=>[
                    new Sequentially([
                        new NotBlank(message: 'Indiquez votre email'),
                        new Length(max: 180,maxMessage: 'maximum 180 caractères '),
                        new Email(message: 'l\'email saisi n\'est pas valide ')
                    ])
                ]
            ])
            ->add('submit',SubmitType::class,['attr'=>['class'=>'btn btn-outline-dark text-capitalize col-12 mx-auto'],
                'label'=>'Saisir adresse email',

            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([]);
    }
}
