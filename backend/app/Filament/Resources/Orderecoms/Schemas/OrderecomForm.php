<?php

namespace App\Filament\Resources\Orderecoms\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Schema;

class OrderecomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ✅ MEMBER (READ ONLY)
                Select::make('member_id')
                    ->relationship('member', 'fullname')
                    ->disabled()
                    ->dehydrated(false),

                // ✅ ADDRESS (VIEW ONLY)
                Placeholder::make('address')
                    ->label('Address')
                    ->content(fn($record) => $record?->member?->address ?? 'No Address'),

                // ✅ PRODUCT NAME (READ ONLY)
                TextInput::make('product_name')
                    ->disabled()
                    ->dehydrated(false),

                // ✅ QUANTITY (READ ONLY)
                TextInput::make('quantity')
                    ->numeric()
                    ->disabled()
                    ->dehydrated(false),

                // ✅ TOTAL AMOUNT (READ ONLY)
                TextInput::make('total_amount')
                    ->numeric()
                    ->disabled()
                    ->dehydrated(false),

                // ✅ IMAGE (VIEW ONLY - NO EDIT)
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('product')
                    ->visibility('public')
                    ->disabled()
                    ->dehydrated(false),

                // 🔥 ONLY EDITABLE FIELD
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'dispatched' => 'Dispatched',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
            ]);
    }
}