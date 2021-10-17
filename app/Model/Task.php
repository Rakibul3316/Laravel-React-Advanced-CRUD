<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {
    public function projects() {
        return $this->belongsTo( Project::class );
    }
}
