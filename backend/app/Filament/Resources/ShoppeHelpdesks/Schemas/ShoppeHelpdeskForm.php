<?php

namespace App\Filament\Resources\ShoppeHelpdesks\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;

class ShoppeHelpdeskForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('member_name')
    ->label('Member Name')
    ->disabled()
    ->dehydrated(false) // important
    ->formatStateUsing(function ($record) {
        return $record?->member?->fullname ?? 'N/A';
    }),

                TextInput::make('subject')
                    ->disabled(),

                Textarea::make('message')
                    ->rows(3)
                    ->disabled(),

                Textarea::make('admin_reply')
                    ->label('Admin Reply')
                    ->rows(4)
                    ->required(),

                Select::make('status')
                    ->options([
                        'open' => 'Open',
                        'closed' => 'Closed',
                    ])
                    ->disabled(), // auto handled
            ]);
    }
}