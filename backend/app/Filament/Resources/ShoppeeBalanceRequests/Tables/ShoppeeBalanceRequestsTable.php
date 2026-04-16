<?php

namespace App\Filament\Resources\ShoppeeBalanceRequests\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;

class ShoppeeBalanceRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

                Tables\Columns\TextColumn::make('type')
                    ->label('Type')
                    ->sortable(),
                 
                Tables\Columns\TextColumn::make('amount')
                    ->money('INR'),

                Tables\Columns\TextColumn::make('mode_of_payment'),

                Tables\Columns\TextColumn::make('transaction_no'),

                // ✅ IMAGE CLICKABLE
                Tables\Columns\ImageColumn::make('payment_slip')
                    ->disk('public')
                    ->height(50)
                    ->extraImgAttributes([
                        'style' => 'cursor:pointer;',
                        'onclick' => "window.open(this.src, '_blank')"
                    ]),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'Approved',
                        'danger' => 'Rejected',
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d-m-Y H:i'),

            ])

            ->filters([
                //
            ])

            ->recordActions([
                EditAction::make(),
            ])

            // ❌ REMOVE DELETE BULK ACTION
            ->toolbarActions([
                // empty
            ]);
    }
}