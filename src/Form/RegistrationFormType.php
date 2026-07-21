<?php

namespace App\Form;

use App\Entity\User;
use DateTimeImmutable;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PostSubmitEvent;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\Sequentially;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email',EmailType::class,['attr'=>['class'=>'form-control text-primary-emphasis'],'required'=>true,
                'label'=>'Email *',
                'label_attr'=>['class'=>'form-check-label text-warning-emphasis'],
                'constraints'=>[
                    new Sequentially([
                        new NotBlank(message: 'Indiquez votre email'),
                        new Length(max: 180,maxMessage: 'maximum 180 caractères '),
                        new Email(message: 'l\'email saisi n\'est pas valide ')
                    ])
                ]
            ])
            ->add('pseudo',TextType::class,['attr'=>['class'=>'form-control text-primary-emphasis'],'required'=>true,
                'label'=>'Pseudo *',
                'label_attr'=>['class'=>'form-check-label text-warning-emphasis'],
                'constraints'=>[
                    new Sequentially([
                        new NotBlank(message: '!'),
                        new Regex(
                            pattern: '/^[a-zA-Z0-9 -\'èçàéï]{6,50}$/i',
                            message: '',
                            htmlPattern: '^[a-zA-Z0-9 -\'èçàéï]{6,50}$',
                        )
                    ])
                ]
            ])
            ->add('plainPassword', PasswordType::class,[
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password','class'=>'form-control text-secondary'],
                'label'=>'Mot de passe *',
                'label_attr'=>['class'=>'form-check-label text-warning-emphasis'],
                'constraints' => [
                    new Sequentially([
                        new NotBlank(
                            message: '!',
                        ),
                        new Length(
                            min: 10,
                            max: 10,
                            minMessage: '',
                            maxMessage: '',
                        ),
                        new Regex(
                            pattern: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$/i',
                            message: '',
                            htmlPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$'
                        )
                    ])
                ],
            ])
            ->add('portrait',FileType::class,['attr'=>['class'=>'form-control text-primary-emphasis' ,'type'=>'file','required'=>true],
                'constraints'=>[
                    new Sequentially([
                        new NotBlank(['message'=>'!']),
                        new File(
                            maxSize: '2M', filenameMaxLength: 2048, maxSizeMessage: ' ', filenameTooLongMessage: ' '
                            , extensions: ['jpeg','jpg'], extensionsMessage: " ",
                        ),
                        new Image(
                            mimeTypes: ['image/jpeg'], minWidth: '1024', maxWidth: '1920', maxHeight: '1080', minHeight: '728',
                            maxWidthMessage: ' ', minWidthMessage: ' ', maxHeightMessage: ' ', minHeightMessage: ' '
                        ),

                    ])
                ],'multiple'=>false,'mapped'=>false,'required'=>true,'label'=>'Portrait *','label_attr'=>['class'=>'form-check-label text-warning-emphasis'] ],

            )
            ->add('agreeTerms', CheckboxType::class, ['attr'=>[],
                'mapped' => false,
                'label'=>'  Acceptation *',
                'label_attr'=>['class'=>'form-check-label p-2 text-warning-emphasis','id'=>'labelAgreeRegister'],
                'constraints' => [
                    new IsTrue(
                        message: '!',
                    ),
                ],
            ])
            ->add('register',SubmitType::class,[
                'label'=>'Saisir vos coordonnées'
            ])
            ->addEventListener(FormEvents::POST_SUBMIT,$this->addDate(...))
        ;
    }

    public function addDate(PostSubmitEvent $event):void
    {
        $data = $event->getData();
        if(!$data instanceof User)return;
        $data->setCreatedAt(new DateTimeImmutable());
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
