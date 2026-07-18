<?php

namespace App\Controller;

use App\Entity\Portrait;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\AppUserAuthenticator;
use App\Service\IntraController;
use App\Service\JwtService;
use App\Service\PhotoService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Exception\ExceptionInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    private const string SUBJECT = 'Activation de votre compte';
    private const string DESTINATION = 'check_user';
    private const string TEMPLATE = 'register';
    private const string FILE_PORTRAIT = 'portraits';

    /**
     * @param Request $request
     * @param UserPasswordHasherInterface $userPasswordHasher
     * @param ValidatorInterface $validator
     * @param PhotoService $photoService
     * @param Security $security
     * @param EntityManagerInterface $entityManager
     * @param IntraController $intraController
     * @param JwtService $jwtService
     * @param MessageBusInterface $messageBus
     * @return Response
     * @throws ExceptionInterface
     * @throws Exception
     */
    #[Route('/register', name: 'app_register',methods: ['POST','GET'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher,ValidatorInterface $validator,PhotoService $photoService,
                             Security $security, EntityManagerInterface $entityManager,IntraController $intraController,
                             JwtService $jwtService,MessageBusInterface $messageBus): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        if($request->isMethod('POST')){
            $errors = $validator->validate($request);
            if(count($errors)>0){
                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form,'errors'=>$errors
                ]);
            }
            if ($form->isSubmitted() && $form->isValid()) {

                $portrait = $form->get('portrait')->getData();
                if($portrait->getClientOriginalExtension()==='jpeg'){
                    try{
                        $file = $photoService->add($portrait,$user->getEmail(),self::FILE_PORTRAIT,480,480);
                        $image = new Portrait();
                        $image->setName($file);
                        $image->setAlt($user->getEmail());
                        $user->setPortrait($image);
                    }catch(UploadException $e)
                    {
                        return $this->redirectToRoute('app_error',['exception'=>$e]);
                    }
                }
                /** @var string $plainPassword */
                $plainPassword = $form->get('plainPassword')->getData();

                // encode the plain password
                $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword))
                    ->setRoles(['ROLE_USER']);
                try {
                    $entityManager->persist($user);
                    $entityManager->flush();
                }catch(EntityNotFoundException $e){
                    return $this->redirectToRoute('app_error',['exception'=>$e]);
                }

                // do anything else you need here, like send an email
                $intraController->emailValidate($user,$jwtService,$messageBus,self::DESTINATION,self::SUBJECT,self::TEMPLATE);
                $this->addFlash('warning','Confirmez votre email pour activer votre compte.');
                return $security->login($user, AppUserAuthenticator::class, 'main');
            }

        }
        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    /**
     * @param $token
     * @param JwtService $jwtService
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    #[Route('/check/{token}',name:'check_user')]
    public function verifyUser($token, JwtService $jwtService, UserRepository $userRepository, EntityManagerInterface $entityManager): Response
    {
        // if token valid, expired & !modified
        if($jwtService->isValid($token) && !$jwtService->isExpired($token) && $jwtService->check($token, $this->getParameter('app.jwtsecret'))){
            $payload = $jwtService->getPayload($token);
            //user token
            try{
                $user = $userRepository->find($payload['user_id']);
                $user->setIsVerified(true)->setIsLetter(true);
                $entityManager->persist($user);
                $entityManager->flush();
                $this->addFlash('success','Le compte est maintenant actif.');
                return $this->redirectToRoute('app_main');
            }catch(EntityNotFoundException $e){
                return $this->redirectToRoute('app_error',['exception'=>$e]);
            }
        }
        $this->addFlash('danger','Token off !');
        return $this->redirectToRoute('app_login');

    }
}
