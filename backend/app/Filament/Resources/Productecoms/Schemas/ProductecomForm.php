<?php

namespace App\Filament\Resources\Productecoms\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;
use Illuminate\Support\Str; // ✅ IMPORTANT

class ProductecomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Forms\Components\TextInput::make('name')
                ->required(),

            Forms\Components\TextInput::make('brand'),

            Forms\Components\TextInput::make('price')
                ->numeric()
                ->prefix('₹')
                ->required(),

            Forms\Components\TextInput::make('offer_price')
                ->label('Offer Price')
                ->numeric()
                ->prefix('₹')
                ->nullable()
                ->placeholder('Leave empty if no offer'),
            // ✅ AUTO DISCOUNT (READ ONLY)
            Forms\Components\TextInput::make('discount_percentage')
                ->label('Discount (%)')
                ->disabled(),

            // ✅ CATEGORY
            Forms\Components\Select::make('category_id')
                ->label('Category')
                ->relationship('category', 'name')
                ->searchable()
                ->preload()
                ->required(),

            Forms\Components\Textarea::make('description'),

            // ✅ IMAGE UPLOAD (FIXED)
            Forms\Components\FileUpload::make('image')
                ->image()
                ->disk('public')
                ->directory('product')
                ->visibility('public')
                ->imagePreviewHeight('150')
                ->preserveFilenames()
                ->getUploadedFileNameForStorageUsing(function ($file) {

                    // get original name
                    $originalName = $file->getClientOriginalName();

                    // optional: clean spaces
                    $cleanName = str_replace(' ', '-', $originalName);

                    return $cleanName;
                }),

            // ✅ VIRAL (OUTSIDE)
            Forms\Components\Toggle::make('is_viral')
                ->label('Viral Product')
                ->default(false),

        ]);
    }
}