<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface AuthInterface {
    public function checkIfAuthenticated( Request $request );
    public function registerUser( Request $request );
    public function findUserByEmailAddress( $email );
}
