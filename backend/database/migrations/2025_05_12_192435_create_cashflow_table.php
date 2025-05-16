<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cashflows', function (Blueprint $table) {
            $table->id();
            $table->string('income');
            $table->string('transport'); // removed 'unique' unless needed
            $table->float('other');
            $table->float('expenses');
            $table->string('profit'); // fixed typo
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cashflows');
    }
};
