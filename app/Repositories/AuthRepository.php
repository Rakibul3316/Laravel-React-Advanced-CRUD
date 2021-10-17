<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthInterface {

    public function checkIfAuthenticated( Request $request ) {
        if ( Auth::attempt( ['email' => $request->email, 'password' => $request->password] ) ) {
            return true;
        }
        return false;
    }

    public function registerUser( Request $request ) {
        $user = new User();

        $user->name     = $request->name;
        $user->password = Hash::make( $request->password );
        $user->email    = $request->email;
        $user->save();
        return $user;
    }

    public function findUserByEmailAddress( $email ) {
        $user = User::where( 'email', $email )->first();
        return $user;
    }
}
