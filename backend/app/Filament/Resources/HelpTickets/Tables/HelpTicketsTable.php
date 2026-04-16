<?php

namespace App\Filament\Resources\HelpTickets\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HelpTicketsTable
{
    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([

                TextColumn::make('id')
                    ->sortable(),

                TextColumn::make('member.fullname')
                    ->label('Name')
                    ->default('N/A'),

                TextColumn::make('member.email')
                        ->label('Email')
                    ->default('N/A'),

                TextColumn::make('category'),

                TextColumn::make('subject'),
                TextColumn::make('details'),

                TextColumn::make('admin_reply')
                    ->label('Reply')
                    ->limit(50),

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
                ViewAction::make(),
                EditAction::make(),
            ]);
    }
}
