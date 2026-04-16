<?php

namespace App\Filament\Resources\ShoppeeMembers\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;

class ShoppeeMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('member_id')
                    ->label('Member ID')
                    ->disabled(),

                TextInput::make('fullname')
                    ->required(),

                // 🔽 Branch Dropdown
                Select::make('branch_name')
                    ->options([
                        'Bharuch Branch' => 'Bharuch Branch',
                        'Ankleshwar Branch' => 'Ankleshwar Branch',
                    ])
                    ->required(),

                TextInput::make('branch_pan'),

                DatePicker::make('dob')
                    ->required(),

                TextInput::make('gst_no'),

                TextInput::make('email')
                    ->email(),

                TextInput::make('mobile_no'),

                Textarea::make('address'),

                TextInput::make('pin_code'),

                // 🔽 State Dropdown
                Select::make('state')
                    ->options([
                        'Gujarat' => 'Gujarat',
                        'Maharashtra' => 'Maharashtra',
                        'Rajasthan' => 'Rajasthan',
                    ])
                    ->searchable(),

                TextInput::make('city'),

                TextInput::make('district'),
            ]);
    }
}