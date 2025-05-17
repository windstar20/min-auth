import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// NextAuth에서 사용할 사용자 타입 확장
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    }
  }
}

// JWT 타입 확장
interface CustomJWT extends JWT {
  id?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Supabase',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials, req) {

        // console.log('credentials', credentials, req);


        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Supabase 클라이언트 생성 (서버 사이드에서는 createClient 사용)
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );

          console.log('supabase', supabase);

          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            console.error('로그인 오류:', error);
            return null;
          }

          // NextAuth User 객체 반환
          return {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || data.user.email || '',
          };
        } catch (error) {
          console.error('인증 오류:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('token', token);

      // 사용자 로그인 시 JWT 토큰에 사용자 정보 추가
      const customToken = token as CustomJWT;
      if (user) {
        customToken.id = user.id;
        customToken.email = user.email;
        customToken.name = user.name;
      }
      return customToken;
    },
    async session({ session, token }) {
      // 세션에 JWT 토큰의 정보 추가
      const customToken = token as CustomJWT;
      if (customToken && session.user) {
        session.user.id = customToken.id as string;
        session.user.email = customToken.email as string;
        session.user.name = customToken.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
