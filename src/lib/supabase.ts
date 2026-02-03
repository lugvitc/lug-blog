import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types.ts";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function handleSignInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        redirectTo: `${window.location.href}`,
        skipBrowserRedirect: false,
    }
    })

    if (error) console.error('Error signing in with Google:', error);
}

export async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error signing out:', error)
}

export async function getComments(post_slug: string) {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            id,
            content,
            created_at,
            url_slug,
            user_id,
            profiles!user_id (
                name,
                avatar_url
            )
        `)
        .eq('url_slug', post_slug)
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
    return data;
}

export async function createComment(post_slug: string, content: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
        throw new Error('User not authenticated');
    }
    await supabase.from('profiles').upsert({
        id: user.data.user.id,
        name: user.data?.user.user_metadata?.name || 'Anonymous',
        avatar_url: user.data?.user.user_metadata?.picture || null,
    });
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {
                url_slug: post_slug,
                content: content,
                user_id: user.data.user.id,
            },
        ]);
    if (error) {
        console.error('Error creating comment:', error);
        return null;
    }
    const comment_box = document.querySelector('.comment-box') as HTMLTextAreaElement;
    comment_box.value = '';
    location.reload();
    return data;
}