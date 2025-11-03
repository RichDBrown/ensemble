import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const token_hash = requestUrl.searchParams.get('token_hash')
    const type = requestUrl.searchParams.get('type')
    const next = requestUrl.searchParams.get('next') ?? '/'
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')

    // Handle errors from Supabase
    if (error) {
      console.error('Auth callback error:', { error, error_description })
      const errorUrl = new URL('/sign-in', requestUrl.origin)
      let errorMessage = error_description || error
      
      if (error === 'access_denied' && error_description?.includes('expired')) {
        errorMessage = 'Email confirmation link has expired. Please sign up again or request a new confirmation email.'
      } else if (error_description) {
        errorMessage = decodeURIComponent(error_description.replace(/\+/g, ' '))
      }
      
      errorUrl.searchParams.set('error', errorMessage)
      return NextResponse.redirect(errorUrl)
    }

    const supabase = await createClient()

    // Handle PKCE code exchange (most common flow)
    if (code) {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        const errorUrl = new URL('/sign-in', requestUrl.origin)
        errorUrl.searchParams.set('error', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }

      // Success - user is now authenticated
      // Redirect to home page since user is already logged in after email verification
      const successUrl = new URL('/', requestUrl.origin)
      return NextResponse.redirect(successUrl)
    }

    // Handle OTP verification (legacy flow)
    if (token_hash && type) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      })

      if (verifyError) {
        console.error('OTP verification error:', verifyError)
        const errorUrl = new URL('/sign-in', requestUrl.origin)
        errorUrl.searchParams.set('error', verifyError.message)
        return NextResponse.redirect(errorUrl)
      }

      // Success - user is now authenticated, redirect to home
      const successUrl = new URL('/', requestUrl.origin)
      return NextResponse.redirect(successUrl)
    }

    // Fallback redirect
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  } catch (error) {
    console.error('Callback error:', error)
    const requestUrl = new URL(request.url)
    const errorUrl = new URL('/sign-in', requestUrl.origin)
    errorUrl.searchParams.set('error', 'An error occurred during email verification')
    return NextResponse.redirect(errorUrl)
  }
}

