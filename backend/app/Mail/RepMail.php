<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RepMail extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->from(config('mail.from.address'))
                    ->subject('Test Email from YM Products')
                    ->view('emails.rep_mail'); // Create this view
    }
}