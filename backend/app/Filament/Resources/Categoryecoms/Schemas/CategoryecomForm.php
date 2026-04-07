<?php

namespace App\Filament\Resources\Categoryecoms\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str; // ✅ IMPORTANT
class CategoryecomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                     ->required()
                    ->maxLength(255),

                

FileUpload::make('image')
    ->image()
    ->disk('public')
    ->directory('categories')
    ->imagePreviewHeight('100')
    ->getUploadedFileNameForStorageUsing(function ($file, $get) {

        $name = $get('name'); // category name

        if (!$name) {
            return $file->getClientOriginalName();
        }

        // 🔥 convert to slug (hair-care)
        $slug = Str::slug($name);

        // 🔥 get extension (jpg/png)
        $extension = $file->getClientOriginalExtension();

        return $slug . '.' . $extension;
    }),
            ]);
    }
}
