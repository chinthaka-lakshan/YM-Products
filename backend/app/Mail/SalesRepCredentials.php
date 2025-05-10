<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SalesRepCredentials extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $password;
    public $loginUrl;

    public function __construct($name, $email, $password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->loginUrl = config('app.url').'/sales-rep/login';
    }

    public function build()
    {
        return $this->subject('Your YM Products Sales Rep Account')
                   ->markdown('emails.rep-credentials');
    }
}