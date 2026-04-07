<?php

namespace App\Filament\Resources\HelpTickets\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HelpTicketsTable
{
   public static function table(Table $table): Table
{
    return $table
        ->columns([

            TextColumn::make('id')
                ->sortable(),

TextColumn::make('member.fullname')
    ->label('Name')
    ->default('N/A'),

TextColumn::make('member.email')
    ->default('N/A'),

TextColumn::make('member.mobile_no')
    ->label('Mobile')
    ->default('N/A'),
            TextColumn::make('category'),

            TextColumn::make('status')
                ->badge()
                ->colors([
                    'warning' => 'pending',
                    'success' => 'replied',
                ]),

            TextColumn::make('created_at')
                ->dateTime(),
        ])
        ->actions([
               EditAction::make(),
        ]);
}
}
