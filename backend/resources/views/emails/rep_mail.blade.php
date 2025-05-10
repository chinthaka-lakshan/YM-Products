@component('mail::message')
# Test Email from YM Products

This is a test email to verify email configuration.

@component('mail::button', ['url' => config('app.url')])
Visit Site
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent