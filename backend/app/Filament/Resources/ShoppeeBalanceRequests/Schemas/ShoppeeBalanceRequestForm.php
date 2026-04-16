<?php

namespace App\Filament\Resources\ShoppeeBalanceRequests\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;

class ShoppeeBalanceRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // 👇 Show details (readonly)
                Forms\Components\TextInput::make('type')
                    ->disabled(),

                Forms\Components\TextInput::make('amount')
                    ->disabled(),

                Forms\Components\TextInput::make('mode_of_payment')
                    ->disabled(),

                Forms\Components\TextInput::make('transaction_no')
                    ->disabled(),

                // 👇 Image preview
                Forms\Components\FileUpload::make('payment_slip')
                    ->disk('public')
                    ->image()
                    ->disabled(),

                // ✅ ONLY EDITABLE FIELD
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'Approved' => 'Approved',
                        'Rejected' => 'Rejected',
                    ])
                    ->required(),

            ]);
    }
}