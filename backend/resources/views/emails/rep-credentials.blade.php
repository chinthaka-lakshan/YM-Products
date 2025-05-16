{{-- resources/views/emails/rep-credentials.blade.php --}}
@component('mail::message')
# Welcome to YM Products, {{ $name }}!

**Your account details:**  
**Email:** {{ $email }}  
**Password:** {{ $password }}  

@component('mail::button', ['url' => $loginUrl])
Login to Your Account
@endcomponent

Please change your password after first login.

Thanks,  
{{ config('app.name') }}
@endcomponent