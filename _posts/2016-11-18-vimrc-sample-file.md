---
id: 208
title: .vimrc sample file
date: 2016-11-18T09:24:58+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=208
permalink: /2016/11/18/vimrc-sample-file/
categories:
  - develop tools
  - vim
tags:
  - linux
  - vim
  - vimrc
---
<!--?prettify linenums=true?-->

<pre class="prettyprint">" Don't try to be vi compatible
set nocompatible

" Helps force plugins to load correctly when it is turned back on below
filetype off

" TODO: Load plugins here (pathogen or vundle)

" Turn on syntax highlighting
syntax on

" For plugins to load correctly
filetype plugin indent on

" TODO: Pick a leader key
" let mapleader = ","

" Security
set modelines=0

" Show line numbers
set number

" Show file stats
set ruler

" Blink cursor on error instead of beeping (grr)
set visualbell

" Encoding
set encoding=utf-8

" Whitespace
set wrap
" set textwidth=79
set formatoptions=tcqrn1
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
set noshiftround

" Cursor motion
set scrolloff=3
set backspace=indent,eol,start
set matchpairs+=&lt;:&gt; " use % to jump between pairs
runtime! macros/matchit.vim

" Move up/down editor lines
nnoremap j gj
nnoremap k gk

" Allow hidden buffers
set hidden

" Rendering
set ttyfast

" Status bar
set laststatus=2

" Last line
set showmode
set showcmd

" Searching
nnoremap / /\v
vnoremap / /\v
set hlsearch
set incsearch
set ignorecase
set smartcase
set showmatch
map &lt;leader&gt;&lt;space&gt; :let @/=''&lt;cr&gt; " clear search

" Remap help key.
inoremap &lt;F1&gt; &lt;ESC&gt;:set invfullscreen&lt;CR&gt;a
nnoremap &lt;F1&gt; :set invfullscreen&lt;CR&gt;
vnoremap &lt;F1&gt; :set invfullscreen&lt;CR&gt;

" Textmate holdouts

" Formatting
map &lt;leader&gt;q gqip

" Visualize tabs and newlines
set listchars=tab:▸\ ,eol:¬
" Uncomment this to enable by default:
" set list " To enable by default
" Or use your leader key + l to toggle on/off
map &lt;leader&gt;l :set list!&lt;CR&gt; " Toggle tabs and EOL

" Color scheme (terminal)
" set t_Co=256
" set background=dark
" let g:solarized_termcolors=256
" let g:solarized_termtrans=1
" put https://raw.github.com/altercation/vim-colors-solarized/master/colors/solarized.vim
" in ~/.vim/colors/ and uncomment:
" colorscheme solarized

" python mode plugin
" https://github.com/davidhalter/jedi-vim/</pre>

Reference: <a href="https://gist.github.com/simonista/8703722" target="_blank">https://gist.github.com/simonista/8703722</a>