<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\AuthRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class AuthApiController extends Controller {

    public $authRepository;

    public function __construct( AuthRepository $authRepository ) {
        $this->authRepository = $authRepository;
    }

    public function createToken() {
        $user        = User::first();
        $accreeToken = $user->createToken( 'authToken' )->accessToken;
        return $accreeToken;
    }

    public function login( Request $request ) {

        $formData  = $request->all();
        $validator = FacadesValidator::make( $formData, [
            'email'    => 'required',
            'password' => 'required',
        ], [
            'email.required'    => 'Please give your email address',
            'password.required' => 'Please give your password',
        ] );

        if ( $validator->fails() ) {
            return response()->json( [
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors'  => $validator->getMessageBag(),
            ] );
        }

        if ( $this->authRepository->checkIfAuthenticated( $request ) ) {
            $user        = $this->authRepository->findUserByEmailAddress( $request->email );
            $accreeToken = $user->createToken( 'authToken' )->accessToken;
            return response()->json( [
                'success'      => true,
                'message'      => "Logged In Successfully !! ",
                'user'         => $user,
                'access_token' => $accreeToken,
            ] );
        } else {
            return response()->json( [
                'success' => false,
                'message' => "Sorry Invalid Email & Password.",
                'errors'  => null,
            ] );
        }
    }

    public function register( Request $request ) {

        $formData  = $request->all();
        $validator = FacadesValidator::make( $formData, [
            'name'     => 'required|min:3|max:30',
            'email'    => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed|min:8',
        ], [
            'name.required'     => 'Please give your name',
            'email.required'    => 'Please give your email address',
            'email.unique'      => 'Your email address is already used, Please login or use another email address !',
            'password.required' => 'Please give your password',
        ] );

        if ( $validator->fails() ) {
            return response()->json( [
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors'  => $validator->getMessageBag(),
            ] );
        }

        $user = $this->authRepository->registerUser( $request );
        if ( !is_null( $user ) ) {
            $user        = $this->authRepository->findUserByEmailAddress( $request->email );
            $accreeToken = $user->createToken( 'authToken' )->accessToken;
            return response()->json( [
                'success'      => true,
                'message'      => "Logged In Successfully !! ",
                'user'         => $user,
                'access_token' => $accreeToken,
            ] );
        } else {
            return response()->json( [
                'success' => false,
                'message' => "Registration cannot successfull.",
                'errors'  => null,
            ] );
        }
    }
}
